import React from 'react';
import {
  Input as KittenInput,
  InputProps as KittenInputProps,
  Text,
} from '@ui-kitten/components';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

type InputProps = {
  errorMessage?: string;
  showError?: boolean;
  formatNumber?: boolean;
  errorTextStyle?: StyleProp<TextStyle>;
} & KittenInputProps;

const Input: React.FC<InputProps> = ({
  textStyle: inputTextStyle,
  style: inputStyle,
  label,
  placeholder,
  value,
  status,
  errorMessage,
  showError,
  multiline,
  formatNumber,
  keyboardType,
  errorTextStyle,
  onChangeText,
}) => {
  const handleOnChangeText = (value) => {
    onChangeText && onChangeText(value);
  };

  return (
    <>
      <KittenInput
        style={inputStyle}
        textStyle={inputTextStyle}
        status={status}
        label={label}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholder={placeholder}
        onChangeText={handleOnChangeText}
        value={value}
      />
      {showError && (
        <Text style={StyleSheet.flatten([styles.errorText, errorTextStyle])}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 8,
    color: '#B00020',
  },
});

export default Input;
