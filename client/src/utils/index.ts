// eslint-disable-next-line import/no-anonymous-default-export

const round2Decimals = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

const convertCurrency: ConvertCurrency = (newCurrency, amount, convRate) => {
  switch (newCurrency) {
    case 'USD':
      return round2Decimals(amount * convRate.EurToUsd);
    case 'EUR':
      return round2Decimals(amount * convRate.UsdToEur);
    default:
      return round2Decimals(amount * convRate.EurToUsd);
  }
};

export default {
  convertCurrency,
};
