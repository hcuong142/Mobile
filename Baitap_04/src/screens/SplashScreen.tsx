import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  Easing 
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
  const opacityLogo = useSharedValue(0);
  const opacityTitle = useSharedValue(0);
  const opacitySlogan = useSharedValue(0);

  useEffect(() => {
    opacityLogo.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.out(Easing.exp) }),
      -1, 
      true 
    );
    setTimeout(() => {
      opacityTitle.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) });
    }, 800);

    setTimeout(() => {
      opacitySlogan.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) });
    }, 900);
  }, []);

  const animatedLogo = useAnimatedStyle(() => ({
    opacity: opacityLogo.value,
  }));

  const animatedTitle = useAnimatedStyle(() => ({
    opacity: opacityTitle.value,
  }));

  const animatedSlogan = useAnimatedStyle(() => ({
    opacity: opacitySlogan.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedLogo]}>
        <LottieView 
          source={require("../assets/lottie/logo.json")} 
          autoPlay 
          loop={true} 
          style={styles.logo}
        />
      </Animated.View>
      <Animated.Text style={[styles.title, animatedTitle]}>
        OREBI
      </Animated.Text>
      <Animated.Text style={[styles.slogan, animatedSlogan]}>
        Fresh. Fast. For You!
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 200,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 500,
    height: 600, 
    marginBottom: -180
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 6,
    textTransform: "uppercase",
    fontFamily: "BebasNeue-Regular",
  },
  slogan: {
    fontSize: 24,
    fontWeight: "500",
    color: "#555",
    marginTop: 10,
    letterSpacing: 4,
    fontFamily: "PlayfairDisplay-Regular",
  },
});

export default SplashScreen;
