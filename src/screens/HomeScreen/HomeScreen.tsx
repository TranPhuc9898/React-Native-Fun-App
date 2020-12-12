import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Product} from '../../types/types';
import {FlatList} from 'react-native-gesture-handler';
import ProductCard from '../../pureComponent/ProductCard/ProductCard';
import {getCurrencyFormat} from '../../utils';
import commonStyles from '../../theme/commonStyles';
import {FloatingAction} from 'react-native-floating-action';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    firestore()
      .collection('products')
      .onSnapshot((QuerySnapshot) => {
        const data = QuerySnapshot.docs.map((doc) => doc.data()) as Product[];
        setProducts(data);
      });
  }, []);

  const renderProductItem = ({item}: {item: Product}) => {
    return (
      <ProductCard
        cardHeadline={item.brandName}
        cardImage={item.productImage.thumbnail[0]}
        cardTitle={item.productName}
        cardSubtitle={getCurrencyFormat(
          'VN',
          'vi',
          'VND',
          Number(item.productPrice),
        )}
      />
    );
  };

  const handleOnAddProductBtnClick = () => {
    navigation.navigate('FormProductModal');
  };

  return (
    <View
      style={StyleSheet.flatten([commonStyles.fullScreen, commonStyles.p2])}>
      <FlatList
        numColumns={2}
        data={products}
        extraData={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId}
      />
      <FloatingAction
        showBackground={false}
        onPressMain={handleOnAddProductBtnClick}
      />
    </View>
  );
};

export default HomeScreen;
