import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

const subscriptionKey = process.env.AZURE_COGNITIVE_SERVICE_SUBSCRIPTIONKEY;
const region = process.env.AZURE_COGNITIVE_SERVICE_REGION;

const AZURE_SPEECH_TO_TEXT_API = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
const AZURE_SPEECH_KEY = subscriptionKey;

export const convertSpeechToText = async (path) => {
    console.log(`Path: `, path);
    const audioBase64 = await RNFS.readFile(path, 'base64');

    const targetPath = '/mnt/shared/Pictures/123.wav';
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
}