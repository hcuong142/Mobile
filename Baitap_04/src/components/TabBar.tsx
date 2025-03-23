import {View, StyleSheet, LayoutChangeEvent} from 'react-native';
import TabBarButton from './TabBarButton';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {appColors} from '../constant/appColors';
import {useEffect, useState} from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({height: 20, width: 100});
  const buttonWidth = dimensions.width / state.routes.length;
  
    useEffect(() => {
        tabPositionX.value = withTiming(buttonWidth * state.index, {
            duration: 200,
        });
    },[state.index]);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(()=> {
    return {
        transform: [{translateX: tabPositionX.value}]
    }
  });

  return (
    <View onLayout={onTabBarLayout} style = {styles.TabBar}>
      <Animated.View
        style={[animatedStyle, {
          position: 'absolute',
          backgroundColor: appColors.orange,
          top: 0,
          left: 20,
          height: 2,
          width: buttonWidth / 2,
        }]}
      />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarButton
            key={route.key}
            routeName={route.name}
            label={label as string}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={() =>
              navigation.emit({type: 'tabLongPress', target: route.key})
            }
          />
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  TabBar: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: appColors.white,
  },
});
