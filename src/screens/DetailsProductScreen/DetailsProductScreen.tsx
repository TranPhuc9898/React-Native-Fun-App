import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackParamList} from '../../navigtion';
import {getProductById} from '../../utils';
import {Product} from '../../types/types';
import commonStyles from '../../theme/commonStyles';

import {Layout, Spinner, Text} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

type DetailsProductScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'DetailsProduct'
>;

type DetailsProductScreenRouteProp = RouteProp<
  HomeStackParamList,
  'DetailsProduct'
>;

type Props = {
  navigation?: DetailsProductScreenNavigationProp;
  route?: DetailsProductScreenRouteProp;
};

const DetailsProductScreen: React.FC<Props> = ({route}) => {
  const productId = route?.params?.productId;
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductById(productId)
        .then((result) => {
          setProduct(result.data() as Product);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  return (
    <Layout level={'2'} style={[commonStyles.fullScreen, commonStyles.p3]}>
      <FastImage
        style={styles.productImage}
        source={{uri: product?.productImage.thumbnails[0]}}
      />
      <Text style={commonStyles.mt2} category={'h4'}>
        {`Brand Name: ${product?.brandName}`}
      </Text>
      <Text style={commonStyles.mt2} category={'h6'}>
        {`Product Name: ${product?.productName}`}
      </Text>
      <Text style={commonStyles.mt2} category={'s1'}>
        {`Description: ${product?.productDescription}`}
      </Text>
      {isLoading && (
        <View
          style={[
            commonStyles.fullScreen,
            commonStyles.justifyContentCenter,
            commonStyles.alignItemsCenter,
          ]}>
          <Spinner />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: 250,
  },
});

export default DetailsProductScreen;
