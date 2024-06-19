import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  Dimensions,
  Animated,
  PermissionsAndroid,
} from 'react-native';
import {Buffer} from 'buffer';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Audio} from 'expo-av';
import {useRoute} from '@react-navigation/native';
import Header from '../../components/header';
import chatbotBackground from '../../../assets/icons/chatbot/background.png';
import sendIcon from '../../../assets/icons/send.png';
import micIcon from '../../../assets/icons/ph_microphone-fill.png';

import {useAuth} from '../../contexts/AuthContext';

import chatbotIcon from '../../../assets/icons/chatbot/chatbot_icon.png';
import chatuserIcon from '../../../assets/icons/chatbot/chatuser_icon.png';

const screenWidth = Dimensions.get('window').width;

const audioRecorderPlayer = new AudioRecorderPlayer();
const promptWavPath = `${RNFS.DocumentDirectoryPath}/prompt.wav`;
const convertedWavPath = `${RNFS.DocumentDirectoryPath}/prompt_converted.wav`;

const subscriptionKey = process.env.AZURE_COGNITIVE_SERVICE_SUBSCRIPTIONKEY;
const region = process.env.AZURE_COGNITIVE_SERVICE_REGION;

const AZURE_SPEECH_TO_TEXT_API = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
const AZURE_SPEECH_KEY = subscriptionKey;

const Segment = ({colors}) => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(colorAnim, {
        toValue: colors.length - 1,
        duration: 300 * colors.length,
        useNativeDriver: false,
      }),
    ).start();
  }, [colors, colorAnim]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: colors.map((_, index) => index),
    outputRange: colors,
  });

  return <Animated.View style={[styles.segment, {backgroundColor}]} />;
};

const ThinkingIndicator = () => {
  const colorSequence1 = ['#F0808077', '#FFFFFF00', '#FFFFFF00'];
  const colorSequence2 = ['#FFFFFF00', '#F0808099', '#FFFFFF00'];
  const colorSequence3 = ['#FFFFFF00', '#FFFFFF00', '#F08080'];

  return (
    <View style={styles.indicatorContainer}>
      <Image
        source={chatbotIcon}
        style={{height: 40, width: 40, marginRight: 4, marginLeft: 8}}
      />
      <Segment colors={colorSequence1} />
      <Segment colors={colorSequence2} />
      <Segment colors={colorSequence3} />
    </View>
  );
};

const ChatScreen = () => {
  const route = useRoute();
  const {topicId, topicTitle, stop} = route.params || {};

  const DEFAULT_TOPIC_TITLE = 'DEFAULT_TITLE';
  const DEFAULT_TOPIC_ID = 'DEFAULT_ID';

  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [recording, setRecording] = useState();
  const [loading, setLoading] = useState(false);

  const {topics} = useSelector(state => state.chatbot);
  const [isTopicHidden, setIsTopicHidden] = useState(true);
  //const [isTopicChosen, setIsTopicChosen] = useState(false);
  const [selectedTopicTitle, setSelectedTopicTitle] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const {user} = useAuth();

  console.log(user.id);

  const maxLengthOfDescription = (screenWidth * 2 * 0.8) / 16;

  const trimDescription = description => {
    const descLength = description.length;

    if (descLength <= maxLengthOfDescription) {
      return description;
    } else {
      if (!/^[A-Za-z]$/.test(description[maxLengthOfDescription - 4])) {
        return description.slice(0, maxLengthOfDescription - 4) + '...';
      } else {
        return description.slice(0, maxLengthOfDescription - 3) + '...';
      }
    }
  };

  const handleSend = async () => {
    // if topicTitle is null
    if (!selectedTopicTitle) {
      setSelectedTopicTitle(DEFAULT_TOPIC_TITLE);
      setSelectedTopicId(DEFAULT_TOPIC_ID);
    }
    if (question) {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(
          'http://172.174.247.52:5000/chatbot/',
          {
            text: question,
            topicId: selectedTopicId,
            userId: user.id,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const answer = response.data.msg;
        setConversation([...conversation, {question, answer}]);
        setQuestion('');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRecord = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording URI: ', uri);
      setRecording(null);
    } else {
      const {status} = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        const recording = new Audio.Recording();
        try {
          await recording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
          );
          await recording.startAsync();
          setRecording(recording);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Permission to access microphone denied');
      }
    }
  };

  const startRecording = async () => {
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

  const handleStartRecording = async () => {
    await startRecording();
  };

  const stopRecording = async () => {
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
          //dispatch(transcribeAudio(wavFilePath));
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

  const convertSpeechToText = async path => {
    console.log(`Path: `, path);
    const audioBase64 = await RNFS.readFile(path, 'base64');

    const targetPath = '/mnt/shared/Pictures/output.wav';
    const sourcePath = path;

    RNFS.copyFile(sourcePath, targetPath)
      .then(() => console.log('File copied'))
      .catch(error => console.error('Copy file error', error));

    const base64ToBinary = base64 => {
      const binaryString = Buffer.from(base64, 'base64').toString('binary');
      const length = binaryString.length;
      const bytes = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    };

    const binaryData = base64ToBinary(audioBase64);

    const language = 'en-US';

    const response = await fetch(
      `${AZURE_SPEECH_TO_TEXT_API.trim()}?language=${language}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY.trim(),
          'Content-type': 'audio/wav; codecs=audio/pcm; samplerate=16000;',
          Accept: 'application/json',
        },
        body: binaryData,
      },
    );

    const data = await response.json();
    console.log(data);
    if (data['RecognitionStatus'] === 'Success') {
      return data['DisplayText'];
    } else {
      return '';
    }
  };

  const handleStopRecording = async () => {
    await stopRecording();
    console.log(`Recording Stopped`);
    const textFromSpeech = await convertSpeechToText(convertedWavPath);
    setQuestion(textFromSpeech);
  };

  const FinishButton = props => {
    return (
      <TouchableOpacity>
        <Text>{props.text}</Text>
      </TouchableOpacity>
    );
  };

  const renderAnswer = text => {
    const parts = text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={styles.boldText}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });

    return (
      <View style={styles.answerBox}>
        <View>
          <Image source={chatbotIcon} style={styles.answerChatbotIcon} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.normalText}>{parts}</Text>
        </View>
      </View>
    );
  };

  const revertIsTopicHidden = () => {
    setIsTopicHidden(!isTopicHidden);
  };

  const handleChooseTopic = index => {
    setSelectedTopicTitle(topics[index].title);
    setSelectedTopicId(topics[index].id);
  };

  return (
    <View style={styles.container}>
      <Header
        visible={true}
        text={'Chatbot'}
        color={'#FFFBF8'}
        editable={false}
        chatSidebar={!loading && !conversation.length}
      />
      <ImageBackground source={chatbotBackground} style={styles.background}>
        <ScrollView style={styles.content}>
          {selectedTopicTitle ? (
            <View style={styles.rootSelectedView}>
              <Text style={styles.rootSelectedViewTopic}>
                {selectedTopicTitle === DEFAULT_TOPIC_TITLE
                  ? "You haven't choosen a topic"
                  : `You have chosen a topic\n"${selectedTopicTitle}"`}
              </Text>
            </View>
          ) : (
            <View>
              <View style={styles.rootView}>
                <Image style={styles.rootViewImage} source={chatbotIcon} />
                <Text style={styles.rootViewText}>
                  Hello, Choose the topic{'\n'}you would like to discuss
                </Text>
              </View>
              <View style={styles.rootViewTopicList}>
                {topics.map((topic, index) => {
                  if (index > 2 && isTopicHidden) {
                    return null;
                  } else {
                    return (
                      <TouchableOpacity
                        onPress={() => handleChooseTopic(index)}
                        key={index}
                      >
                        <View style={styles.rootViewTopic} key={index}>
                          <Text style={styles.rootViewTopicTitle}>
                            {topic.title}
                          </Text>
                          <Text style={styles.rootViewTopicDescription}>
                            {trimDescription(topic.description)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
                {isTopicHidden ? (
                  <TouchableOpacity onPress={revertIsTopicHidden}>
                    <Text style={styles.rootViewViewAll}>View All</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={revertIsTopicHidden}
                    style={{marginBottom: 20}}
                  >
                    <Text style={styles.rootViewViewAll}>Hide</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          {conversation.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <View style={styles.underline} />
              <View style={styles.questionBox}>
                <Text style={styles.question}>{entry.question}</Text>
                <Image source={chatuserIcon}></Image>
              </View>
              <View style={styles.underline} />
              {renderAnswer(entry.answer)}
            </View>
          ))}
        </ScrollView>
        {loading ? <ThinkingIndicator /> : null}
        <View style={styles.footer}>
          <View style={[styles.inputContainer, stop && styles.disabled]}>
            <TextInput
              style={styles.input}
              value={question}
              onChangeText={setQuestion}
              placeholder="Ask a question..."
              editable={!loading && !stop}
            />
            <TouchableOpacity
              style={[
                styles.button,
                (loading || stop) && styles.buttonDisabled,
              ]}
              onPress={handleSend}
              disabled={loading || stop}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ImageBackground source={sendIcon} style={styles.sendIcon} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.micButton, stop && styles.buttonDisabled]}
            //onPress={handleRecord}
            onPressIn={() => handleStartRecording()}
            onPressOut={() => handleStopRecording()}
            disabled={stop}
          >
            <Image source={micIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  entry: {
    marginBottom: 15,
  },
  closedText: {
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    color: 'red',
    marginVertical: 20,
  },
  topicText: {
    width: 361,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 25,
    textAlign: 'center',
    color: '#1E1D2080',
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    height: 92,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F08080',
    borderRadius: 64,
    padding: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'Open Sans',
    borderWidth: 0,
    outline: 'none',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F08080',
    borderRadius: 64,
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  micButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
  icon: {
    width: 32,
    height: 32,
  },
  disabled: {
    backgroundColor: '#E0E0E0',
  },

  ///////////////
  rootView: {
    alignItems: 'center',
  },
  rootViewImage: {
    height: 100,
    width: 100,
    marginTop: 50,
    marginBottom: 30,
  },
  rootViewText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  rootViewTopicList: {
    marginTop: 60,
    gap: 16,
  },
  rootViewTopic: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#1E1D2033',
    borderRadius: 15,
  },
  rootViewTopicTitle: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 12,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#1E1D20',
  },
  rootViewTopicDescription: {
    fontFamily: 'OpenSans-Normal',
    fontSize: 16,
    paddingLeft: 12,
    paddingBottom: 12,
  },
  rootViewViewAll: {
    fontSize: 21,
    fontFamily: 'OpenSans-SemiBold',
    color: '#F08080',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  //////
  rootSelectedView: {
    marginTop: 116,
    marginBottom: 32,
  },
  rootSelectedViewTopic: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    color: '#1E1D2080',
  },

  //////
  questionBox: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 5,
    gap: 15,
    // borderRadius: 15,
    // borderWidth: 1,
    // borderColor: '#1E1D2033',
  },
  questionChatUserIcon: {
    height: 20,
    width: 20,
  },
  question: {
    flex: 8,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 26,
    padding: 3,
    color: `#1E1D20`,
  },
  underline: {
    height: 1,
    backgroundColor: '#0000000C',
    width: '100%',
  },

  ////////
  answerBox: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 5,
    gap: 8,
  },
  boldText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 26,
    color: `#1E1D20`,
  },
  answerChatbotIcon: {
    height: 40,
    width: 40,
  },
  normalText: {
    fontFamily: 'OpenSans-Normal',
    fontSize: 16,
    lineHeight: 25.6,
    color: `#1E1D20`,
  },
  textBox: {
    flex: 8,
  },
  answer: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 25.6,
    marginTop: 5,
  },

  //////////////
  indicatorContainer: {
    backgroundColor: '#FF000000',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    gap: 4,
  },
  segment: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#F08080',
  },
});

export default ChatScreen;
