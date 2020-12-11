import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import commonStyles from '../../theme/commonStyles';

type ProductCardProps = {
  cardImage?: string;
  cardHeadline?: string;
  cardTitle?: string;
  cardSubtitle?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  cardImage,
  cardHeadline,
  cardTitle,
  cardSubtitle,
}) => {
  return (
    <Card style={styles.defaultCard}>
      <FastImage
        style={styles.defaultImage}
        source={{uri: cardImage}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={StyleSheet.flatten([
          commonStyles.justifyContentCenter,
          commonStyles.alignItemsCenter,
        ])}>
        <Text
          style={StyleSheet.flatten([
            commonStyles.mt2,
            commonStyles.textCenter,
          ])}
          category="s1">
          {cardHeadline?.toUpperCase()}
        </Text>
        <Text
          style={StyleSheet.flatten([
            commonStyles.mt2,
            commonStyles.textCenter,
          ])}
          category="s1">
          {cardTitle}
        </Text>
        <Text
          style={StyleSheet.flatten([
            commonStyles.mt2,
            commonStyles.textCenter,
          ])}>
          {cardSubtitle}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  defaultCard: {
    flex: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 8,
  },
  defaultImage: {
    aspectRatio: 3 / 4,
    width: '100%',
    height: undefined,
    borderRadius: 16,
  },
});

export default ProductCard;
