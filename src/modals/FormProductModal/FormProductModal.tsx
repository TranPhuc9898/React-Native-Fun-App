import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import commonStyles from '../../theme/commonStyles';

const FormProductModal = () => {
  return (
    <View style={StyleSheet.flatten([commonStyles.fullScreen])}>
      <Text>{'Create Product'}</Text>
    </View>
  );
};

export default FormProductModal;
