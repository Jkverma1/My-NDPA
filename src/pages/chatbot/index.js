import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import ChatSidebar from './ChatSidebar';

import {LogBox} from 'react-native';
import ChatTopics from './ChatTopics';
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const Stack = createStackNavigator();

const ChatbotSection = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator initialRouteName="ChatScreen">
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
          initialParams={{param: false}}
        />
        <Stack.Screen
          name="ChatSidebar"
          component={ChatSidebar}
          options={{headerShown: false}}
          initialParams={{param: false}}
        />
        <Stack.Screen
          name="ChatTopics"
          component={ChatTopics}
          options={{headerShown: false}}
          initialParams={{param: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ChatbotSection;
