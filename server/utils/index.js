const AV_BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&apikey=${process.env.AV_API_KEY}`;

const getAVUrl = symbol => `${AV_BASE_URL}&symbol=${symbol}`;

module.exports = {
        getAVUrl,
};
