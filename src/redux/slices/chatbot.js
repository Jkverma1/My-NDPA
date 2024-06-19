import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../../utils/axios';

const initialState = {
  topics: null,
};

const slice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    putTopics(state, action) {
      state.topics = action.payload;
    },
  },
});

export default slice.reducer;

export const {putTopics} = slice.actions;

export const retrieveChatBotTopics = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    const response = await axiosInstance.get(`/chatbot/retrievetopics/`, {
      headers: {
        authorization: token,
      },
    });
    
    await dispatch(putTopics(response.data.topics));
  } catch (err) {
    console.log(
      `Error occurred fetching user settings by ID: ${JSON.stringify(err)}`,
    );
  }
};
