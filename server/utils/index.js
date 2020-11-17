const AV_BASE_URL = `https://www.alphavantage.co/query?interval=1min&apikey=${process.env.AV_API_KEY}`;
const SWOP_BASE_URL = `https://swop.cx/graphql?api-key=${process.env.SWOP_API_KEY}`;

const getTimeSeriesUrl = symbol => `${AV_BASE_URL}&symbol=${symbol}&function=TIME_SERIES_INTRADAY`;
const getOverviewUrl = symbol => `${AV_BASE_URL}&symbol=${symbol}&function=OVERVIEW`;
const getQuoteUrl = symbol => `${AV_BASE_URL}&symbol=${symbol}&function=GLOBAL_QUOTE`;

const getSwopUrl = () => `${SWOP_BASE_URL}`;

const getConversionRates = EurToUsd => ({
        EurToUsd,
        UsdToEur: 1 / EurToUsd,
});

const convertCurrency = (currency, amount, EurToUsd) => {
        const conversionRates = getConversionRates(EurToUsd);
        switch (currency) {
                case 'USD':
                        return amount * conversionRates.EurToUsd;
                case 'EUR':
                        return amount * conversionRates.UsdToEur;
                default:
                        return amount * conversionRates.EurToUsd;
        }
};

module.exports = {
        getTimeSeriesUrl,
        getOverviewUrl,
        getQuoteUrl,
        getSwopUrl,
        convertCurrency,
};
