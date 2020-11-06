const server = require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server, {
        transports: ['websocket', 'polling'],
});

let tick = 0;
const clients = {};

const data = [
        { date: new Date(2019, 0, 7), petrol: 120.27, diesel: 130.33 },
        { date: new Date(2019, 0, 14), petrol: 119.53, diesel: 129.47 },
        { date: new Date(2019, 0, 21), petrol: 119.12, diesel: 128.92 },
        { date: new Date(2019, 0, 28), petrol: 119.29, diesel: 129.1 },
        { date: new Date(2019, 1, 4), petrol: 119.13, diesel: 129.13 },
        { date: new Date(2019, 1, 11), petrol: 118.97, diesel: 129.17 },
        { date: new Date(2019, 1, 18), petrol: 119.05, diesel: 129.23 },
        { date: new Date(2019, 1, 25), petrol: 119.22, diesel: 129.66 },
        { date: new Date(2019, 2, 4), petrol: 119.72, diesel: 130.25 },
        { date: new Date(2019, 2, 11), petrol: 120.1, diesel: 130.59 },
        { date: new Date(2019, 2, 18), petrol: 120.48, diesel: 130.85 },
        { date: new Date(2019, 2, 25), petrol: 120.83, diesel: 131.15 },
        { date: new Date(2019, 3, 1), petrol: 121.7, diesel: 131.48 },
        { date: new Date(2019, 3, 8), petrol: 122.75, diesel: 132.08 },
        { date: new Date(2019, 3, 15), petrol: 124.06, diesel: 132.96 },
        { date: new Date(2019, 3, 22), petrol: 125.43, diesel: 133.99 },
        { date: new Date(2019, 3, 29), petrol: 126.36, diesel: 134.6 },
        { date: new Date(2019, 4, 6), petrol: 127.5, diesel: 135.41 },
        { date: new Date(2019, 4, 13), petrol: 127.97, diesel: 135.36 },
        { date: new Date(2019, 4, 20), petrol: 128.51, diesel: 135.82 },
        { date: new Date(2019, 4, 27), petrol: 129.14, diesel: 136.45 },
        { date: new Date(2019, 5, 3), petrol: 129.41, diesel: 136.39 },
        { date: new Date(2019, 5, 10), petrol: 128.89, diesel: 135.4 },
        { date: new Date(2019, 5, 17), petrol: 127.66, diesel: 133.76 },
        { date: new Date(2019, 5, 24), petrol: 126.66, diesel: 131.81 },
        { date: new Date(2019, 6, 1), petrol: 126.49, diesel: 131.55 },
        { date: new Date(2019, 6, 8), petrol: 126.86, diesel: 131.68 },
        { date: new Date(2019, 6, 15), petrol: 127.13, diesel: 131.86 },
        { date: new Date(2019, 6, 22), petrol: 127.81, diesel: 132.21 },
        { date: new Date(2019, 6, 29), petrol: 128.03, diesel: 132.6 },
        { date: new Date(2019, 7, 5), petrol: 128.37, diesel: 132.61 },
        { date: new Date(2019, 7, 12), petrol: 128.36, diesel: 132.59 },
        { date: new Date(2019, 7, 19), petrol: 128.17, diesel: 132.6 },
        { date: new Date(2019, 7, 26), petrol: 128.22, diesel: 132.51 },
        { date: new Date(2019, 8, 2), petrol: 127.86, diesel: 132.29 },
        { date: new Date(2019, 8, 9), petrol: 127.79, diesel: 131.89 },
        { date: new Date(2019, 8, 16), petrol: 126.92, diesel: 131.35 },
        { date: new Date(2019, 8, 23), petrol: 126.78, diesel: 131.52 },
        { date: new Date(2019, 8, 30), petrol: 126.92, diesel: 131.83 },
        { date: new Date(2019, 9, 7), petrol: 126.87, diesel: 131.82 },
        { date: new Date(2019, 9, 14), petrol: 126.91, diesel: 131.89 },
        { date: new Date(2019, 9, 21), petrol: 126.4, diesel: 131.28 },
        { date: new Date(2019, 9, 28), petrol: 125.77, diesel: 130.6 },
        { date: new Date(2019, 10, 4), petrol: 125.56, diesel: 130.38 },
        { date: new Date(2019, 10, 11), petrol: 125.59, diesel: 130.42 },
        { date: new Date(2019, 10, 18), petrol: 125.58, diesel: 130.35 },
        { date: new Date(2019, 10, 25), petrol: 125.32, diesel: 130.08 },
        { date: new Date(2019, 11, 2), petrol: 124.81, diesel: 129.79 },
        { date: new Date(2019, 11, 9), petrol: 124.75, diesel: 129.79 },
        { date: new Date(2019, 11, 16), petrol: 124.33, diesel: 129.56 },
        { date: new Date(2019, 11, 23), petrol: 124.16, diesel: 129.81 },
        { date: new Date(2019, 11, 30), petrol: 124.96, diesel: 130.54 },
];

io.on('connection', client => {
        clients[client.id] = client;

        setInterval(() => {
                tick += 1;
                if (tick > data.length - 1) tick = 0;

                os.cpuUsage(cpuPercent => {
                        // client.emit('cpu', {
                        //         name: tick,
                        //         value: cpuPercent,
                        // });
                        // client.emit('cpu', data[tick]);
                        client.emit('cpu', { name: tick, petrol: data[tick].petrol });
                });
        }, 1000);

        io.on('disconnect', function() {
                delete clients[client.id];
        });
});

server.listen(3001);
