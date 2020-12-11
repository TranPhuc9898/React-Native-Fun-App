const getCurrencyFormat = (
  countryCode: string,
  languageCode: string,
  currencyCode: string,
  value: string,
) => {
  return new Intl.NumberFormat(`${languageCode}-${countryCode}`, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
};

export {getCurrencyFormat};
