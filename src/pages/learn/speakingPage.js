import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import {
  Image,
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

import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

import {useAuth} from '../../contexts/AuthContext';
import {getUserInfo} from '../../utils/getUserInfo';
import {saveUserProgress} from '../../utils/saveUserProgress';

const audioRecorderPlayer = new AudioRecorderPlayer();
const promptWavPath = `${RNFS.DocumentDirectoryPath}/prompt.wav`;
const convertedWavPath = `${RNFS.DocumentDirectoryPath}/prompt_converted.wav`;

const greatJobIcon = require('../../../assets/icons/great_ico.png');
const dontGiveUpIcon = require('../../../assets/icons/try_again_ico.png');

const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me.png');
const turtle_ico = require('../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../assets/icons/charm_sound-up.png');
const message = require('../../../assets/icons/message.png');
const mechat = require('../../../assets/icons/mechat.png');

const micFrameImage = require('../../../assets/icons/mic_frame.png');
const sendButtonImage = require('../../../assets/icons/send_voice_button.png');
const recordButtonImage = require('../../../assets/icons/repeact_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const conversations = [
  {
    question: 'Hi! My name is Tom.\nWhat is your name?',
    answer: 'Hi! My name is _____.',
  },
  {
    question: 'Nice to meet you.\nHow old are you?',
    answer: "I'm _____ years old",
  },
  {
    question: 'I have ADHD.\nWhat about you?',
    answer: 'I have _____.',
  },
  {
    question: "What's your gender\n identity?",
    answer: 'I identify as _____.',
  },
];

const SpeakingPage = () => {
  const {user} = useAuth();
  const userInfo = getUserInfo(user);

  const keywords = [
    userInfo.name,
    userInfo.age,
    userInfo.symptom,
    userInfo.gender,
  ];

  const answers = [
    `Hi! My name is ${userInfo.name}`,
    `I'm ${userInfo.age} years old`,
    `I have ${userInfo.symptom}`,
    `I identify as ${userInfo.gender}`,
  ];

  const dispatch = useDispatch();
  const {txtAudio} = useSelector(state => state.audio);
  const [isLoading, setIsLoading] = useState(false);

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [progress, setProgress] = useState(100 / conversations.length);

  const [isSpeakingFinished, setIsSpeakingFinished] = useState(false);
  const [isSendButtonPressed, setIsSendButtonPressed] = useState(false);

  const [isResultPresented, setIsResultPresented] = useState(false);

  const [currentUserAnswer, setCurrentUserAnswer] = useState('');
  const [isCurrentUserAnswerCorrect, setIsCurrentUserAnswerCorrect] =
    useState(false);

  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  const handleContinue = async () => {
    const lastIndex = conversations.length - 1;
    if (currentConversationIndex === lastIndex) {
      // save the user progress in async storage
    } else {
      setProgress(progress + 100 / conversations.length);
      setCurrentConversationIndex(currentConversationIndex + 1);
      setIsResultPresented(false);
      setIsSpeakingFinished(false);
    }
  };

  useEffect(() => {
    if (results.length === conversations.length) {
      console.log(`SpeakingPage: `, results)
      saveUserProgress('Personal_Identity', 'Speaking', results);

      const data = {
        name: userInfo.name,
        age: userInfo.age,
        identity: userInfo.gender,
        symptom: userInfo.symptom,
      };
      navigation.navigate('ExitSpeakingPage', {
        param: data,
      });
    }
  }, [results]);

  const handleTryAgain = () => {
    setProgress(progress);
    setCurrentConversationIndex(currentConversationIndex);
    setIsResultPresented(false);
    setIsSpeakingFinished(false);
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

  const MessageBlock = ({children}) => (
    <>
      <View style={styles.imageContainer}>
        <Image source={message} />
        <Text style={styles.title}>{children}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 155,
          right: screenWidth / 20,
        }}
      >
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

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

    console.log(`Text: ${text}`);
    const keyword = keywords[currentConversationIndex];
    let updatedResults = [...results];

    if (text.includes(keyword)) {
      setCurrentUserAnswer(answers[currentConversationIndex]);
      setIsCurrentUserAnswerCorrect(true);

      updatedResults = [
        ...updatedResults,
        {
          question: conversations[currentConversationIndex].question,
          answer: answers[currentConversationIndex],
          isCorrect: true,
        },
      ];
    } else {
      setCurrentUserAnswer(text);
      setIsCurrentUserAnswerCorrect(false);

      updatedResults = [
        ...updatedResults,
        {
          question: conversations[currentConversationIndex].question,
          answer: text,
          isCorrect: false,
        },
      ];
    }

    setResults(updatedResults);
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
          <Text style={styles.resultText}> {currentUserAnswer}</Text>
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
          <Text style={styles.resultText}> {currentUserAnswer}</Text>
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
      <Header
        visible={true}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <ProgressBar />

      <Image
        source={t_icon}
        style={{position: 'absolute', left: screenWidth / 20, top: 80}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 280}}
      />

      <MessageBlock
        children={conversations[currentConversationIndex].question}
      />

      <View style={styles.me_imageContainer}>
        <Image source={mechat} style={{width: 240}} />

        <>
          <Text style={styles.m_title}>
            {conversations[currentConversationIndex].answer}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 9,
              position: 'absolute',
              top: 54,
              left: 0,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                handleClickSound(conversations[currentConversationIndex].answer)
              }
            >
              <Image source={sound_ico} />
            </TouchableOpacity>
            <Image source={turtle_ico} />
          </View>
        </>
      </View>
      {isResultPresented ? (
        isCurrentUserAnswerCorrect ? (
          <GreatJob />
        ) : (
          <DontGiveUp />
        )
      ) : isSpeakingFinished ? (
        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => setIsResultPresented(true)}
        >
          <Text style={styles.continueButton}>Continue</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sendVoiceContainer}>
          <Image source={micFrameImage} />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.sendButtonContainer}
            onPressIn={async () => {
              setIsSendButtonPressed(true);
              await startRecord();
            }}
            onPressOut={async () => {
              setIsSpeakingFinished(true);
              setIsSendButtonPressed(false);
              await handleStopRecord();
            }}
          >
            <Image
              source={isSendButtonPressed ? recordButtonImage : sendButtonImage}
              style={styles.sendButton}
            />
            <Text styles={styles.sendButtonText}>
              {!isSendButtonPressed ? `Press to send` : `Recording now...`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SpeakingPage;

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
});
