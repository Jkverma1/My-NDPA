import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { BlurView } from '@react-native-community/blur';
import {
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import Header from '../../components/header';
import {useNavigation} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import {textToSpeech} from '../../redux/slices/audio';
import {convertSpeechToText} from '../../utils/convertSpeechToText';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';

import CommunicationModal from '../../components/communicationModal';

import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

import {useAuth} from '../../contexts/AuthContext';
import {getUserInfo} from '../../utils/getUserInfo';
import { saveUserProgress } from '../../utils/saveUserProgress';

const audioRecorderPlayer = new AudioRecorderPlayer();
const promptWavPath = `${RNFS.DocumentDirectoryPath}/prompt.wav`;
const convertedWavPath = `${RNFS.DocumentDirectoryPath}/prompt_converted.wav`;

const greatJobIcon = require('../../../assets/icons/great_ico.png');
const dontGiveUpIcon = require('../../../assets/icons/try_again_ico.png');

const reviewIconImage = require('../../../assets/icons/review_ico.png');
const rightMessageImage = require('../../../assets/icons/learn/personal_identity/message_right.png');
const leftMessageImage = require('../../../assets/icons/learn/personal_identity/message_left.png');
const tomIconImage = require('../../../assets/icons/tom_s.png');
const userIconImage = require('../../../assets/icons/me_ico.png');
const voiceIconImage = require('../../../assets/icons/repeact_ico.png');
const micFrameImage = require('../../../assets/icons/mic_frame.png');

const turtleIcon = require('../../../assets/icons/turtle_ico.png');
const soundIcon = require('../../../assets/icons/charm_sound-up.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ReviewPage = () => {
  const {user} = useAuth();
  const userInfo = getUserInfo(user);

  const keywords = [
    userInfo.name,
    userInfo.age,
    userInfo.symptom,
    userInfo.gender,
  ];

  const conversations = [
    {
      question: 'Hi! My name is Tom.\nWhat is your name?',
      answer: `Hi! My name is ${userInfo.name}`,
    },
    {
      question: 'Nice to meet you.\nHow old are you?',
      answer: `I'm ${userInfo.age} years old`,
    },
    {
      question: 'I have ADHD.\nWhat about you?',
      answer: `I have ${userInfo.symptom}`,
    },
    {
      question: "What's your gender\nidentity?",
      answer: `I identify as ${userInfo.gender}`,
    },
  ];

  const dispatch = useDispatch();
  const {txtAudio} = useSelector(state => state.audio);
  const [isLoading, setIsLoading] = useState(false);

  const [isSendButtonPressed, setIsSendButtonPressed] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isResultPresent, setIsResultPresented] = useState(false);
  const [isResultCorrect, setIsResultCorrect] = useState(false);

  const [progress, setProgress] = useState(100 / conversations.length);

  const [results, setResults] = useState([]);

  const navigation = useNavigation();

  const handleContinue = async () => {
    const lastIndex = conversations.length - 1;
    if (currentQuestionIndex === lastIndex) {
      await saveUserProgress('Personal_Identity', 'Review', results);
      navigation.navigate('PercentSection')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(progress + 100 / conversations.length);
      setIsResultPresented(false);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(currentQuestionIndex);
    setIsResultPresented(false);
  };

  const handleClickSound = async txt => {
    try {
      await dispatch(textToSpeech(txt));
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      playAudio(txtAudio);
    }
  }, [isLoading, playAudio, txtAudio]);

  const playAudio = async audioBase64 => {
    const audioPath = `${RNFS.TemporaryDirectoryPath}tempaudio.mp3`;

    const base64String = audioBase64.replace('data:audio/mp3;base64,', '');

    await RNFS.writeFile(audioPath, base64String, 'base64')
      .then(() => {
        console.log('File written');
      })
      .catch(error => {
        console.error('Error writing file', error);
      });

    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
          setIsLoading(false);
        } else {
          console.log('Playback failed due to audio decoding errors');
          setIsLoading(false);
        }
      });
    });
  };

  const startRecord = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Recording Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Recording permission denied');
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    try {
      const result = await audioRecorderPlayer.startRecorder(
        promptWavPath,
        audioSet,
      );
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  const stopRecord = async () => {
    try {
      const res = await audioRecorderPlayer.stopRecorder();

      if (await RNFS.exists(convertedWavPath)) {
        await RNFS.unlink(convertedWavPath);
      }

      const command = `-i ${promptWavPath} -vn -acodec pcm_s16le -ar 16000 -ac 1 -b:a 256k ${convertedWavPath}`;
      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        const exists = await RNFS.exists(convertedWavPath);
        console.log('Conversion successful, file exists:', exists);
        if (exists) {
          console.log(`WavefilePath: ${convertedWavPath}`);
        } else {
          console.log(
            'Converted file does not exist, fallback to original path',
          );
        }
      } else {
        console.error('FFmpegKit failed to convert the audio file');
      }
    } catch (error) {
      console.error('Error stopping the recorder:', error);
    }
  };

  const handleStopRecord = async () => {
    await stopRecord();
    const text = await convertSpeechToText(convertedWavPath);

    setIsResultPresented(true);

    const keyword = keywords[currentQuestionIndex];
    if (text.includes(keyword)) {
      setIsResultCorrect(true);
      setCurrentAnswer(conversations[currentQuestionIndex].answer);

      //
      setResults([...results, {
        question: conversations[currentQuestionIndex].question,
        answer: conversations[currentQuestionIndex].answer,
        isResultCorrect: true
      }])
    } else {
      setIsResultCorrect(false);
      setCurrentAnswer(text);

      //
      setResults([...results, {
        question: conversations[currentQuestionIndex].question,
        answer: text,
        isResultCorrect: false
      }])
    }
  };

  const TomsMessageBlock = props => {
    return (
      <>
        <View style={styles.tomsMessageContainer}>
          <View style={styles.tomsMessageImageContainer}>
            <Image source={props.userImage} />
          </View>
          <ImageBackground
            source={props.messageImage}
            style={styles.messageBackground}
          >
            <Text style={styles.messageText}>{props.text}</Text>
          </ImageBackground>
        </View>
        <View style={styles.leftSoundContainer}>
          <TouchableOpacity onPress={() => {
            handleClickSound(props.text);
          }}>
            <Image source={soundIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={turtleIcon} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const UserMessageBlock = props => {
    return (
      <>
        <View style={styles.userMessageContainer}>
          <ImageBackground
            source={props.messageImage}
            style={styles.userMessageBackground}
          >
            <Text style={styles.userMessageText}>{props.text}</Text>
          </ImageBackground>
          <View style={styles.tomsMessageImageContainer}>
            <Image source={props.userImage} />
          </View>
        </View>
        {/* <View style={styles.rightSoundContainer}>
          <TouchableOpacity>
            <Image source={soundIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={turtleIcon} />
          </TouchableOpacity>
        </View> */}
      </>
    );
  };

  const ProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
        <Text>{progress}%</Text>
      </View>
    );
  };

  const GreatJob = () => {
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultTitleContainer}>
          <Image source={greatJobIcon} style={styles.resultTitleIcon} />
          <Text style={styles.resultTitle}>Great Job!</Text>
        </View>
        <View style={styles.resultTextContainer}>
          <Text
            style={[
              styles.resultText,
              {color: `#23B80C`, fontFamily: 'OpenSans-SemiBold'},
            ]}
          >
            Correct answer:
          </Text>
          <Text style={styles.resultText}> {currentAnswer}</Text>
        </View>
        <TouchableOpacity
          style={{width: '90%'}}
          onPress={() => {
            console.log(`clicned`);
            handleContinue();
          }}
        >
          <Text style={styles.resultContinueButton}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '90%'}}>
          <Text
            style={styles.resultTryAgainButton}
            onPress={() => {
              handleTryAgain();
            }}
          >
            Manage my answer and try again
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DontGiveUp = () => {
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultTitleContainer}>
          <Image source={dontGiveUpIcon} style={styles.resultTitleIcon} />
          <Text style={styles.resultTitle}>Don't give up</Text>
        </View>
        <View style={styles.resultTextContainer}>
          <Text
            style={[
              styles.resultText,
              {color: `#FFC700`, fontFamily: 'OpenSans-SemiBold'},
            ]}
          >
            Wrong answer:
          </Text>
          <Text style={styles.resultText}> {currentAnswer}</Text>
        </View>
        <TouchableOpacity style={{width: '90%'}}>
          <Text
            style={[
              styles.resultContinueButton,
              {backgroundColor: '#FFC700', color: '#1E1D20'},
            ]}
            onPress={() => {
              handleContinue();
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '90%'}}>
          <Text
            style={[styles.resultTryAgainButton, {borderColor: '#FFC700'}]}
            onPress={() => {
              handleTryAgain();
            }}
          >
            Manage my answer and try again
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CommunicationModal
        icon={reviewIconImage}
        action={null}
        text={`Now it's time to review the\ndialogue. Let's remember all the\nphrases from the conversation.`}
        visible={true}
      />
      <Header
        visible={true}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <ProgressBar />

      {conversations.map((qa, index) => {
        if (currentQuestionIndex === 0 && index === 0) {
          return (
            <React.Fragment key={index}>
              <TomsMessageBlock
                userImage={tomIconImage}
                messageImage={leftMessageImage}
                text={qa.question}
              />
              <UserMessageBlock
                userImage={userIconImage}
                messageImage={rightMessageImage}
                text={qa.answer}
              />
            </React.Fragment>
          );
        } else if (currentQuestionIndex === 1 && (index === 0 || index === 1)) {
          return (
            <React.Fragment key={index}>
              <TomsMessageBlock
                userImage={tomIconImage}
                messageImage={leftMessageImage}
                text={qa.question}
              />
              <UserMessageBlock
                userImage={userIconImage}
                messageImage={rightMessageImage}
                text={qa.answer}
              />
            </React.Fragment>
          );
        } else if (currentQuestionIndex === 2 && index === 2) {
          return (
            <React.Fragment key={index}>
              <TomsMessageBlock
                userImage={tomIconImage}
                messageImage={leftMessageImage}
                text={qa.question}
              />
              <UserMessageBlock
                userImage={userIconImage}
                messageImage={rightMessageImage}
                text={qa.answer}
              />
            </React.Fragment>
          );
        } else if (currentQuestionIndex === 3 && (index === 2 || index === 3)) {
          return (
            <React.Fragment key={index}>
              <TomsMessageBlock
                userImage={tomIconImage}
                messageImage={leftMessageImage}
                text={qa.question}
              />
              <UserMessageBlock
                userImage={userIconImage}
                messageImage={rightMessageImage}
                text={qa.answer}
              />
            </React.Fragment>
          );
        }

        return null;
      })}

      {!isResultPresent ? (
        <View style={styles.sendVoiceContainer}>
          {isSendButtonPressed ? <Image source={micFrameImage} /> : null}
          <TouchableOpacity
            onPressIn={() => {
              setIsSendButtonPressed(true);
              startRecord();
            }}
            onPressOut={() => {
              setIsSendButtonPressed(false);
              handleStopRecord();
            }}
            style={styles.sendButtonContainer}
          >
            <Image source={voiceIconImage} style={styles.sendButton} />
            <Text styles={styles.sendButtonText}>Press to send</Text>
          </TouchableOpacity>
        </View>
      ) : isResultCorrect ? (
        <GreatJob />
      ) : (
        <DontGiveUp />
      )}
    </View>
  );
};

export default ReviewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
    position: 'relative',
  },
  overlay: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -75,
    left: 10,
    // textAlign: 'left',
  },
  m_title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -48,
    right: 10,
    // textAlign: 'left',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  imageContainer: {
    position: 'absolute',
    right: screenWidth / 20,
    top: 80,
    alignItems: 'center',
  },
  me_imageContainer: {
    position: 'absolute',
    left: screenWidth / 20,
    top: 280,
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },

  ///// shibayon
  continueButton: {
    backgroundColor: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 28,
    paddingVertical: 12,
    color: '#FFFFFF',
    borderRadius: 80,
    width: '90%',
    textAlign: 'center',
    position: 'absolute',
  },
  continueContainer: {
    backgroundColor: '#777777',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
  },

  ///// progressBar container
  progressBarContainer: {
    width: '85%',
    height: 8,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F08080',
    borderRadius: 10,
  },

  ///// sendbutton section
  sendVoiceContainer: {
    width: '100%',
    alignItems: 'center',
    bottom: 50,
    position: 'absolute',
  },
  sendButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sendButton: {
    height: 88,
    width: 88,
    marginTop: 24,
  },
  sendButtonText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'OpenSans-Light',
    color: '#1E1D2080',
  },

  //////
  resultContainer: {
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FFF',
    position: 'absolute',
    shadowColor: '#8E8E8F',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 0,
    elevation: 15,
  },
  resultTitleContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18.5,
    marginTop: 25,
  },
  resultTitleIcon: {
    height: 32,
    width: 32,
  },
  resultTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    color: '#1E1D20',
  },
  resultTextContainer: {
    width: '90%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    fontFamily: 'OpenSans-Light',
    fontSize: 16,
    marginBottom: 16,
  },
  resultContinueButton: {
    borderRadius: 45,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#23B80C',
    textAlign: 'center',
    color: `#FFF`,
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 21,
    marginBottom: 12,
  },
  resultTryAgainButton: {
    borderRadius: 45,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: `#1E1D2080`,
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 21,
    borderWidth: 2,
    borderColor: '#23B80C',
    marginBottom: 33,
  },

  /// Toms Message Block
  tomsMessageContainer: {
    flexDirection: 'row',
    marginBottom: 18.5,
    marginTop: 25,
    height: 90,
    width: 264,
    right: 50,
  },
  tomsMessageImageContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  messageBackground: {
    flex: 1,
    justifyContent: 'center',
    height: 90,
    width: 230,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginBottom: 5.5,
    marginLeft: 5.5,
    color: '#1E1D20',
  },

  userMessageBackground: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
    width: 200,
  },
  userMessageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginBottom: 5,
    marginRight: 5,
    color: '#1E1D20',
  },
  userMessageContainer: {
    flexDirection: 'row',
    marginBottom: 18.5,
    marginTop: 25,
    height: 50,
    width: 248,
    left: 50,
  },

  ///// sound
  rightSoundContainer: {
    width: 248,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: -25,
  },
  leftSoundContainer: {
    width: 264,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: -25,
    marginLeft: -70,
    left: 0
  },
});
