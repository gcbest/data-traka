// eslint-disable-next-line import/no-anonymous-default-export

const convertCurrency: ConvertCurrency = (newCurrency, amount, convRate) => {
  switch (newCurrency) {
    case 'USD':
      return amount * convRate.EurToUsd;
    case 'EUR':
      return amount * convRate.UsdToEur;
    default:
      return amount * convRate.EurToUsd;
  }
};

export default {
  convertCurrency,
};
