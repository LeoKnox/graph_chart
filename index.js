const app = require('express')();
const http = require('http').Server(app);
const market = require ('./market');
const io = require('socket.io')(http);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/market', (req, res) => {
    res.send(market.marketPositions);
});

setInterval(function() {
    market.updateMarket();
    io.sockets.emit('market', market.marketPositions[0]);
}, 5000);

io.on('connection', function (socket) {
    console.log('a user connected');
});

app.listen (3000, () => console.log('--port 3000'));