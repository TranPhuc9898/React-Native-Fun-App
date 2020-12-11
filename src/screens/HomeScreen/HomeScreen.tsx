import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Product} from '../../types/types';
import {FlatList} from 'react-native-gesture-handler';
import ProductCard from '../../pureComponent/ProductCard/ProductCard';
import {getCurrencyFormat} from '../../utils';

const HomeScreen = () => {
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
        cardSubtitle={getCurrencyFormat('VN', 'vi', 'VND', item.productPrice)}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={2}
        data={products}
        extraData={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId}
      />
    </View>
  );
};

export default HomeScreen;
