import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CategoryType} from '../types/type';
import {appColors} from '../constant/appColors';

type Props = {
  categories: CategoryType[];
};

const Categories = ({categories}: Props) => {
  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.titleBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator = {false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View style = {styles.item}>
            <Image source={{uri: item.image}} style ={styles.imageImg}/>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: appColors.black,
  },
  titleBtn: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: appColors.black,
  },
  item: {
    marginVertical: 10,
    gap: 5,
    alignItems: 'center',
    marginLeft: 20,
  },
  imageImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: appColors.lightgray,
  }
});
