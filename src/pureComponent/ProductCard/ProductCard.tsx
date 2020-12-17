import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import commonStyles from '../../theme/commonStyles';

type ProductCardProps = {
  cardImage?: string;
  cardHeadline?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  onCardPress?: (event: GestureResponderEvent) => void;
  onCardLongPress?: (event: GestureResponderEvent) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  cardImage,
  cardHeadline,
  cardTitle,
  cardSubtitle,
  onCardPress,
  onCardLongPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.defaultCard}
      onPress={onCardPress}
      onLongPress={onCardLongPress}>
      <FastImage
        style={styles.defaultImage}
        source={{uri: cardImage}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={StyleSheet.flatten([
          commonStyles.justifyContentCenter,
          commonStyles.alignItemsCenter,
          commonStyles.p3,
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultCard: {
    flex: 1,
    backgroundColor: 'white',
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
    width: '100%',
    height: 200,
    maxHeight: 200,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});

export default ProductCard;
