import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackParamList} from '../../navigtion';
import {deleteProduct} from '../../utils';

import {Layout} from '@ui-kitten/components/ui';
import PlusOutlineIcon from 'react-native-eva-icons/icons/PlusOutline';
import {Product} from '../../types/types';
import {FlatList} from 'react-native-gesture-handler';
import ProductCard from '../../pureComponent/ProductCard/ProductCard';
import {getCurrencyFormat} from '../../utils';
import commonStyles from '../../theme/commonStyles';
import FloatingButton from '../../pureComponent/FloatingButton';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('products')
      .onSnapshot((QuerySnapshot) => {
        const data = QuerySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Product),
        );
        setProducts(data);
      });
    return () => {
      subscriber();
    };
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (id) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderProductItem = ({item}: {item: Product}) => {
    const handleOnCardLongPress = () => {
      Alert.alert(
        'Delete product',
        'Are you sure you want to delete this product ?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => handleDeleteProduct(item.id || '')},
        ],
        {cancelable: true},
      );
    };

    const handleOnCardPress = () => {
      navigation.push('DetailsProduct', {
        productId: item.id,
      });
    };

    return (
      <ProductCard
        cardHeadline={item.brandName}
        cardImage={item.productImage.thumbnails[0]}
        cardTitle={item.productName}
        cardSubtitle={getCurrencyFormat(
          'VN',
          'vi',
          'VND',
          Number(item.productPrice),
        )}
        onCardPress={handleOnCardPress}
        onCardLongPress={handleOnCardLongPress}
      />
    );
  };

  const handleOnAddProductBtnClick = () => {
    navigation.navigate('FormProductModal');
  };

  return (
    <Layout
      level={'1'}
      style={StyleSheet.flatten([commonStyles.fullScreen, commonStyles.p2])}>
      <FlatList
        numColumns={2}
        data={products}
        extraData={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) =>
          `${item.productId}${index}${item.productName}`
        }
      />
      <FloatingButton
        icon={() => <PlusOutlineIcon width={24} height={24} fill="#ffffff" />}
        onPress={handleOnAddProductBtnClick}
      />
    </Layout>
  );
};

export default HomeScreen;
