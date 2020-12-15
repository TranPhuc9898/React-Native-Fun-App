import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';

const ErrorText = ({
  errorMessage,
  errorTextStyle,
}: {
  errorMessage?: string;
  errorTextStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <Text style={StyleSheet.flatten([styles.errorText, errorTextStyle])}>
      {errorMessage}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 8,
    color: '#B00020',
  },
});

export default ErrorText;
