import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import SetTimeSection from './setTimerPart';
import StartIndependenceSection from './startIndependencePart';
import IndependenceSection from './independencePart';
import TimerWorkSection from './timerWorkPart';
import PercentIndependenceSection from './percentIndependencePart';
import EnterGym from './enterGym';
import ExitGym from './exitGym';
import EnterTimer from './enterTimer';
import ExitTimer from './exitTimer';
import EnterExercise from './enterExercise';
import {LogBox} from 'react-native';
import Header from '../../../components/header';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainIndependenceSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartIndependenceSection">
      <Stack.Screen
        name="StartIndependenceSection"
        component={StartIndependenceSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EnterGym"
        component={EnterGym}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExitGym"
        component={ExitGym}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EnterTimer"
        component={EnterTimer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetTimeSection"
        component={SetTimeSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExitTimer"
        component={ExitTimer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IndependenceSection"
        component={IndependenceSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EnterExercise"
        component={EnterExercise}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TimerWorkSection"
        component={TimerWorkSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentIndependenceSection"
        component={PercentIndependenceSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainIndependenceSection;
