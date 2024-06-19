import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../../utils/axios';

const initialState = {
  settings: null,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    putUserSettings(state, action) {
      state.settings = action.payload;
    },
  },
});

export default slice.reducer;

export const {putUserSettings} = slice.actions;

export const retrieveUserSettings = userId => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    const response = await axiosInstance.get(`/settings/retrieve/${userId}`, {
      headers: {
        authorization: token,
      },
    });

    console.log(`retrieveUserSettings response.data: `, response.data);
    await dispatch(putUserSettings(response.data.data));
  } catch (err) {
    console.log(
      `Error occurred fetching user settings by ID: ${JSON.stringify(err)}`,
    );
  }
};

export const saveUserSettings = (userId, settings) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    await dispatch(putUserSettings(settings));
    
    const response = await axiosInstance.post(
      `/settings/update/${userId}`,
      {
        settings,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the correct Authorization header format
        },
      },
    );
    
    console.log(`saveUserSettings response.data: `, response.data);

    
  } catch (err) {
    console.log(`Error occurred updating user settings by ID: ${JSON.stringify(err)}`);
  }
};
