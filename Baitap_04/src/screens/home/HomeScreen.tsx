import React, {useEffect, useState} from 'react';
import { StyleSheet} from 'react-native';
import {CategoryType, ProductType} from '../../types/type';
import ProductList from '../../components/ProductList';
import Categories from '../../components/Categories';

type Props = {};

const HomeScreen = ({props}: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const getProducts = async () => {
    const URL = '';
    const response = await axios.get(URL);

    console.log(response.data);
    setProducts(response.data);
    setIsLoading(false);
  };

  const getCategories = async () => {
    const URL = '';
    const response = await axios.get(URL);

    console.log(response.data);
    setCategories(response.data);
    setIsLoading(false);
  };

  return (
    <>
      <Categories categories={categories}/>
      <ProductList products={products} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
