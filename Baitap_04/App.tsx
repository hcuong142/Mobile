import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/SplashScreen";
import AuthNavigator from "./src/navigators/AuthNavigator";
import MainNavigator from "./src/navigators/MainNavigator";

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
