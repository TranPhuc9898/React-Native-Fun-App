import React from 'react';
import {
  Input as KittenInput,
  InputProps as KittenInputProps,
} from '@ui-kitten/components';
import {StyleProp, TextStyle} from 'react-native';
import ErrorText from './ErrorText';

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
  onBlur,
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
        onBlur={onBlur}
        value={value}
      />
      {showError && (
        <ErrorText
          errorMessage={errorMessage || ''}
          errorTextStyle={errorTextStyle}
        />
      )}
    </>
  );
};

export default Input;
