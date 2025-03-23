// import React from 'react';
// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import ProductItem from '../components/ProductItem';
// import {appColors} from '../constant/appColors';
// import { ProductType } from '../types/type';

// type Props = {
//     products: ProductType[]
// }

// const ProductList = ({products}: Props) => {
//   return (
//     <View style={styles.container}>
//             <View style = {styles.titleWrapper}>
//               <Text style = {styles.title}>For you</Text>
//               <TouchableOpacity>
//                 <Text style={styles.titleBtn}>See All</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={products}
//               numColumns={2}
//               columnWrapperStyle = {{justifyContent: 'space-between',marginBottom: 20}}
//               keyExtractor={item => item.id.toString()}
//               renderItem={({index, item}) => <ProductItem item={item} index={index}/>}
//             />
//           </View>
//   )
// }

// export default ProductList

// const styles = StyleSheet.create({
//     container: {
//         marginHorizontal: 20,
//        },
//        titleWrapper: {
//          flexDirection: 'row',
//          justifyContent: 'space-between',
//          marginBottom: 10,  
//        },
//        title: {
//          fontSize: 18,
//          fontWeight: '600',
//          letterSpacing: 0.6,
//          color: appColors.black, 
//        },
//        titleBtn: {
//          fontSize: 14,
//          fontWeight: '500',
//          letterSpacing: 0.6,
//          color: appColors.black, 
//        },
// })


import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import ProductItem from "../components/ProductItem";
import { appColors } from "../constant/appColors";
import { ProductType } from "../types/type";

type Props = {
  products: ProductType[];
};

const ProductList = ({ products }: Props) => {
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6; 

  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  useEffect(() => {
    setVisibleProducts(sortedProducts.slice(0, PAGE_SIZE));
  }, [products]);

  const loadMoreProducts = () => {
    if (loading || visibleProducts.length >= sortedProducts.length) return;
    setLoading(true);

    setTimeout(() => {
      const nextProducts = sortedProducts.slice(0, (page + 1) * PAGE_SIZE);
      setVisibleProducts(nextProducts);
      setPage(page + 1);
      setLoading(false);
    }, 1000); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>For you</Text>
        <TouchableOpacity>
          <Text style={styles.titleBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={visibleProducts}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ index, item }) => <ProductItem item={item} index={index} />}
        onEndReached={loadMoreProducts} // Khi cuộn đến cuối, tải thêm dữ liệu
        onEndReachedThreshold={0.5} // Ngưỡng kích hoạt load (50% cuối danh sách)
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color={appColors.orange} /> : null
        }
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: appColors.black,
  },
  titleBtn: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.6,
    color: appColors.black,
  },
});
