const AV_BASE_URL = `https://www.alphavantage.co/query?interval=1min&apikey=${process.env.AV_API_KEY}`;
const SWOP_BASE_URL = `https://swop.cx/graphql?api-key=${process.env.SWOP_API_KEY}`;

const getTimeSeriesUrl = symbol => `${AV_BASE_URL}&symbol=${symbol}&function=TIME_SERIES_INTRADAY`;
const getOverviewUrl = symbol => `${AV_BASE_URL}&symbol=${symbol}&function=OVERVIEW`;
const getQuoteUrl = symbol => `${AV_BASE_URL}&symbol=${symbol}&function=GLOBAL_QUOTE`;

const getSwopUrl = () => `${SWOP_BASE_URL}`;

const isEmptyObj = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

const isStockNotFound = (overviewResult, timeSeriesResult, quoteResult) =>
        isEmptyObj(overviewResult.data) &&
        !timeSeriesResult.data['Time Series (1min)'] &&
        isEmptyObj(quoteResult.data['Global Quote']);

module.exports = {
        getTimeSeriesUrl,
        getOverviewUrl,
        getQuoteUrl,
        getSwopUrl,
        isStockNotFound,
};
