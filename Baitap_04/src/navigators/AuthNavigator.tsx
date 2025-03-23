import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";


const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name='OnBoardingSreen' component={OnBoardingScreen} />
        <Stack.Screen name = 'WelcomeScreen' component={WelcomeScreen}/>
        <Stack.Screen name ='SignUpScreen' component={SignUpScreen} />
        <Stack.Screen name ='LoginScreen' component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator