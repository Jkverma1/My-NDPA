import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../../utils/axios';
import {dispatch} from '../store';

const initialState = {
  isloading: false,
  error: null,
  message: '',
  up_message: '',
  userInfo: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isloading = true;
    },

    hasError(state, action) {
      state.isloading = false;
      state.error = action.payload;
    },

    PutUserSuccess(state, action) {
      state.isloading = true;
      state.message = action.payload;
    },

    GetUserSuccess(state, action) {
      state.isloading = true;
      state.userInfo = action.payload;
    },

    UpdateUserSuccess(state, action) {
      state.isloading = true;
      state.up_message = action.payload;
    },

    setisLoading(state) {
      state.isloading = false;
    },
  },
});

export default slice.reducer;

export const {PutUserSuccess, GetUserSuccess, UpdateUserSuccess, setisLoading} =
  slice.actions;

export const createProfile = (userData, id) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('userData', userData, id, token);
    const response = await axiosInstance.put(
      `/user/createprofile/${id}`,
      {userData},
      {
        headers: {
          Authorization: token
        },
      },
    );

    console.log('Put profile Result:', response.data);

    dispatch(PutUserSuccess(response.data));

    return response;
  } catch (error) {
    console.error('Error during User:', error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    dispatch(slice.actions.hasError(error));
  }
};

export const getUserInfo = id => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('userData', token);
    const response = await axiosInstance.get(`/user/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    console.log('Put profile Result:', response.data);

    dispatch(GetUserSuccess(response.data));

    return response;
  } catch (error) {
    console.error('Error during User:', error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    dispatch(slice.actions.hasError(error));
  }
};

export const updateUserInfo = (userData, id) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('userData', userData, id);
    const response = await axiosInstance.put(
      `/user/updateprofile/${id}`,
      {userData},
      {
        headers: {
          Authorization: token, 
        },
      },
    );

    console.log('Put profile Result:', response.data);

    dispatch(UpdateUserSuccess(response.data));

    return response;
  } catch (error) {
    console.error('Error during User:', error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    dispatch(slice.actions.hasError(error));
  }
};
