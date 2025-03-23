import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import TabNavigator from "./TabNavigator";
import Header from "../components/Header";


const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: true, header: () => <Header/>}}>
        <Stack.Screen name='Main' component={TabNavigator} />
    </Stack.Navigator>
  )
}
export default AuthNavigator