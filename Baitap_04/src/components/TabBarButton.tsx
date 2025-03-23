import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import icons from "../constant/icons";
import { appColors } from "../constant/appColors";

interface TabBarButtonProps {
  routeName: string;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const TabBarButton = ({ routeName, label, isFocused, onPress, onLongPress }: TabBarButtonProps) => {
  const iconName = icons[routeName] || "help-circle-outline"; 
  const iconColor = isFocused ? appColors.orange : "#888";

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.container}>
      <Icon name={iconName} size={24} color={iconColor} />
      <Text style={[styles.label, isFocused && styles.focusedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  label: {
    color: "#888",
    fontSize: 14,
  },
  focusedLabel: {
    color: appColors.orange,
    fontWeight: "bold",
  },
});
