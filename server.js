const server = require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server, {
        transports: ['websocket', 'polling'],
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

server.listen(3001);
