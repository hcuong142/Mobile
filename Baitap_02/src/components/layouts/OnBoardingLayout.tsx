import { View, Text } from "react-native";
import React from "react";

const OnBoardingLayout = ({ children }: { children: React.ReactNode }) => { //React.ReactNode là kiểu dữ liệu number, string, null
  return <View className="bg-secondary h-screen w-screen">{children}</View>;
};

export default OnBoardingLayout;
