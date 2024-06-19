import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TutorialScreen from './TutorialScreen';
import CalculateMoney from './CalculateMoney';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const Stack = createStackNavigator();

const PromptSection = () => {
  return (
    <Stack.Navigator initialRouteName="Tutorial1">
      {[...Array(13)].map((_, index) =>
        index === 10 ? (
          <Stack.Screen
            name="Tutorial11"
            component={CalculateMoney}
            initialParams={{screenNumber: index + 1}}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            key={`Tutorial${index + 1}`}
            name={`Tutorial${index + 1}`}
            component={TutorialScreen}
            initialParams={{screenNumber: index + 1}}
            options={{headerShown: false}}
          />
        ),
      )}
    </Stack.Navigator>
  );
};

export default PromptSection;
