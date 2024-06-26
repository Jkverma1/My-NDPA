import axios from 'axios';
import {createSlice} from '@reduxjs/toolkit';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

const subscriptionKey = process.env.AZURE_COGNITIVE_SERVICE_SUBSCRIPTIONKEY;
const region = process.env.AZURE_COGNITIVE_SERVICE_REGION;

const AZURE_SPEECH_TO_TEXT_API = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
const AZURE_TEXT_TO_SPEECH_API = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
const AZURE_SPEECH_KEY = subscriptionKey;

const initialState = {
  isloading: false,
  error: null,
  audioTxt: null,
  txtAudio: null,
};

const slice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    startLoading(state) {
      state.isloading = true;
    },

    hasError(state, action) {
      state.isloading = false;
      state.error = action.payload;
    },

    getAudioTextSuccess(state, action) {
      state.isloading = true;
      state.audioTxt = action.payload;
    },

    getTextAudioSuccess(state, action) {
      state.isloading = true;
      state.txtAudio = action.payload;
    },

    setisLoading(state, action) {
      state.isloading = false;
      state.audioTxt = action.payload;
      state.txtAudio = action.payload;
    },
  },
});

export default slice.reducer;

export const {getAudioTextSuccess, getTextAudioSuccess, setisLoading} =
  slice.actions;

export const transcribeAudio = audioPath => async dispatch => {
  try {
    console.log('transcribeAudio', audioPath);
    // check the existense of file
    RNFS.exists(audioPath)
      .then(exists => {
        if (exists) {
          console.log(`File exists`);
        } else {
          console.log(`File does not exist`);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // const targetPath = '/mnt/shared/Pictures/output.wav';
    // const sourcePath = audioPath;

    // RNFS.copyFile(sourcePath, targetPath)
    //   .then(() => console.log('File copied'))
    //   .catch(error => console.error('Copy file error', error));

    // Read the file as binary data
    const audioBase64 = await RNFS.readFile(audioPath, 'base64');
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
        body: binaryData, // Convert base64 back to binary before sending
      },
    );

    if (!response.ok) {
      // Handling response errors
      const errorText = await response.text();
      throw new Error(
        `Speech service responded with an error: ${response.status} ${errorText}`,
      );
    }

    const result = await response.json();
    console.log('Transcription Result:', result);

    // Assuming getAudioTextSuccess is an action that handles the successful transcription
    dispatch(getAudioTextSuccess(result));

    return result;
  } catch (error) {
    console.error('Error during transcription:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    dispatch(slice.actions.hasError(error));
  }
};

// Function to convert text to speech
export const textToSpeech = text => async dispatch => {
  try {
    console.log('---------textToSpeech----------', text);
    const response = await axios.post(
      AZURE_TEXT_TO_SPEECH_API.trim(),
      `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='en-US-JessaNeural'>${text}</voice></speak>`, // XML body to specify the voice and text
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY.trim(),
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3', // Output format
        },
        responseType: 'arraybuffer', // Important to handle the binary audio data
      },
    );

    // Convert the response to a base64 string to play the audio
    const audioBase64 = Buffer.from(response.data, 'binary').toString('base64');
    const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
    console.log('-------audioSrc------');
    dispatch(getTextAudioSuccess(audioSrc));
  } catch (error) {
    console.error('Error:', error);
    dispatch(slice.actions.hasError(error));
  }
};

export const setStateFunc = data => async dispatch => {
  try {
    console.log('---=======setStateFunc=====-------', data);
    dispatch(setisLoading(data));
  } catch (error) {
    console.error('Error:', error);
  }
};
