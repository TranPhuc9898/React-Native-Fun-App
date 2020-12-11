import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Product} from '../../types/types';
import {FlatList} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    firestore()
      .collection('products')
      .onSnapshot((QuerySnapshot) => {
        const data = QuerySnapshot.docs.map((doc) => doc.data());
        setProducts(data as Product[]);
      });
  }, []);

  const renderProductItem = ({item}: {item: Product}) => {
    return <Text key={item.productId}>{item.productName}</Text>;
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId}
      />
    </View>
  );
};

export default HomeScreen;
