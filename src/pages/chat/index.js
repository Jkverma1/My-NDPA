import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './ChatScreen';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const Stack = createStackNavigator();

const ChatSection = () => {
  return (
    <Stack.Navigator initialRouteName="ChatScreen">
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatSection;
