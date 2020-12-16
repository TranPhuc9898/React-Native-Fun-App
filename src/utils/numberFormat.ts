import {Platform} from 'react-native';

const getCurrencyFormat = (
  countryCode: string,
  languageCode: string,
  currencyCode: string,
  value: number,
) => {
  return Platform.OS === 'ios'
    ? new Intl.NumberFormat(`${languageCode}-${countryCode}`, {
        style: 'currency',
        currency: currencyCode,
      }).format(value)
    : value;
};

export {getCurrencyFormat};
