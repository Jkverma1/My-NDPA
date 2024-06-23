import 'react-native-gesture-handler';

// Import React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartPersonalSection from './personalIdPart';
import ResultPage from './ResultPage';
import {LogBox} from 'react-native';
import EnterCafe from './EnterCafe';
import ReadingPage from './readingPage';
import SpeakingPage from './speakingPage';
import ReviewPage from './reviewPage';
import ExitCafe from './ExitCafe';
import EnterSpeakingPage from './EnterSpeakingPage';
import ExitSpeakingPage from './ExitSpeakingPage';
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainLearningSection = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#FFFBF8"}}>
    <Stack.Navigator initialRouteName="StartPersonalSection">
      <Stack.Screen
        name="StartPersonalSection"
        component={StartPersonalSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />

      {/* Newly added pages */}
      <Stack.Screen
        name="EnterCafe"
        component={EnterCafe}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="ReadingPage"
        component={ReadingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExitCafe"
        component={ExitCafe}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EnterSpeakingPage"
        component={EnterSpeakingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpeakingPage"
        component={SpeakingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExitSpeakingPage"
        component={ExitSpeakingPage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ReviewPage"
        component={ReviewPage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="PercentSection"
        component={ResultPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainLearningSection;
