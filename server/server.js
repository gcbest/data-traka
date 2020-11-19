require('dotenv').config({ path: '../.env' });
const path = require('path');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const os = require('os-utils');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
        transports: ['websocket', 'polling'],
});
const { getOverviewUrl, getTimeSeriesUrl, getSwopUrl, getQuoteUrl, isStockNotFound } = require('./utils');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// if (process.env.NODE_ENV.trim() === 'production') {
app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.get('/api/stock', async (req, res) => {
        const { symbol } = req.query;
        const overviewQueryUrl = getOverviewUrl(symbol);
        const timeSeriesQueryUrl = getTimeSeriesUrl(symbol);
        const quoteUrl = getQuoteUrl(symbol);

        try {
                const overviewResult = await axios.get(overviewQueryUrl);
                const timeSeriesResult = await axios.get(timeSeriesQueryUrl);
                const quoteResult = await axios.get(quoteUrl);

                if (isStockNotFound(overviewResult, timeSeriesResult, quoteResult))
                        return res.status(500).send('Unable to find stock');

                let timeSeriesData = [];
                if (timeSeriesResult.data['Time Series (1min)']) {
                        timeSeriesData = Object.entries(timeSeriesResult.data['Time Series (1min)']).map(entry => ({
                                time: entry[0],
                                price: parseFloat(entry[1]['4. close']),
                        }));
                }
                let price = quoteResult.data['Global Quote'] && quoteResult.data['Global Quote']['05. price'];
                price = parseFloat(price);

                res.json({ ...overviewResult.data, timeSeriesData, price });
        } catch (error) {
                console.error(error);
                res.status(500).send('Unable to find stock');
        }
});

app.get('/api/currency', async (req, res) => {
        const queryUrl = getSwopUrl();
        const query = `query LatestEuro {
                latest(baseCurrency: "EUR", quoteCurrencies: ["USD"]) {
                  date
                  baseCurrency
                  quoteCurrency
                  quote
                }
              }`;
        const result = await axios.post(queryUrl, { query });
        // console.log(result.data.data.latest);
        const EurToUsd = result.data.data.latest[0].quote;
        const UsdToEur = 1 / EurToUsd;
        const response = { EurToUsd, UsdToEur };
        res.json(response);
});

app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

let tick = 0;
const clients = {};

io.on('connection', client => {
        clients[client.id] = client;

        setInterval(() => {
                tick += 1;

                os.cpuUsage(cpuPercent => {
                        client.emit('cpu', {
                                name: tick,
                                value: cpuPercent,
                        });
                });
        }, 1000);

        io.on('disconnect', function() {
                delete clients[client.id];
        });
});

const PORT = process.env.PORT || 3001;

const server = http.listen(PORT, () => {
        console.log('server is running on port', server.address().port);
});
