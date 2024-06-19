// App.js
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from './src/contexts/AuthContext';
//redux
import {store} from './src/redux/store';
//pages
import Fpage from './src/pages/fpage';
import Signin from './src/pages/auth/signin';
import Signup from './src/pages/auth/signup';
import Main from './src/pages/main/index';
import Cprofile from './src/pages/auth/completeProfile';
import Profiledone from './src/pages/auth/profileDone';
import Resetpwd from './src/pages/auth/resetPassword';
import Verifyemail from './src/pages/auth/verifyEmail';
import VerifyEmailDone from './src/pages/auth/verifyEmailDone';
import Createpwd from './src/pages/auth/createNewpass';
import Pwddone from './src/pages/auth/pwdDone';
import ChooseRoleScreen from './src/pages/auth/chooseRole';
// import locationTutorial from './src/pages/locationTutorial/index';
import location from './src/pages/location/index';
import ProfileSection from './src/pages/profile/index';
import PromptSection from './src/pages/promptSection/index';
import CommunitySection from './src/pages/community/index';
import ChatSection from './src/pages/chat/index';
import ChatbotSection from './src/pages/chatbot/index'

import BootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
          <Stack.Navigator initialRouteName="Fpage">
            <Stack.Screen
              name="Fpage"
              component={Fpage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChooseYourRole"
              component={ChooseRoleScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Verifyemail"
              component={Verifyemail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerifyEmailDone"
              component={VerifyEmailDone}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Resetpwd"
              component={Resetpwd}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cprofile"
              component={Cprofile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Createpwd"
              component={Createpwd}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Pwddone"
              component={Pwddone}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Profiledone"
              component={Profiledone}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="ProfileSection"
              component={ProfileSection}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Location"
              component={location}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CommunitySection"
              component={CommunitySection}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PromptSection"
              component={PromptSection}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChatSection"
              component={ChatSection}
              options={{headerShown: false}}
            />           
            <Stack.Screen
            name="ChatbotSection"
            component={ChatbotSection}
            options={{headerShown: false}}
          />
            {/* 
          <Stack.Screen
            name="LocationSection"
            component={locationTutorial}
            options={{headerShown: false}}
          />*/}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}

export default App;
