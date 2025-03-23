import {Dimensions, Image, StyleSheet, Text,  TouchableOpacity, View} from 'react-native';
import React from 'react';
import { ProductType } from '../types/type';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { appColors } from '../constant/appColors';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
  item: ProductType;
  index: number;
};

const width = Dimensions.get('window').width - 40;

const ProductItem = ({item,index}: Props) => {
  return (
    <Animated.View style = {styles.container} entering={FadeInDown.delay(300 + index * 100).duration(500)}>
      <Image source={{uri: item.images[0]}} style={styles.productImg} />
      <TouchableOpacity style={styles.bookmarkBtn}>
        <Icon name='heart' size={22} color={appColors.black}/>
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style = {styles.price}>{item.price} Đồng</Text>
        <View style = {styles.ratingWrapper}>
            <Icon name = 'star' size={20} color={'#D4F37'}/>
            <Text>5</Text>
        </View>
      </View>
      
      <Text style = {styles.title}>{item.title}</Text>
    </Animated.View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productImg: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  container: {
    width: width / 2 - 10,
  },
  bookmarkBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 5,
    borderRadius: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.black,
    letterSpacing: 1.1,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: appColors.primary,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 5,
  },
  rating: {
    fontSize: 14,
    color: appColors.gray,
  }
});
