const express = require('express');
const io = require('socket.io')();
const app = express();

app.use(express.static('public'));
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});

const port = process.env.PORT || 3030;

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.emit('connected', {sID: `${socket.id}`, message: `${socket.id} connected`});
    
    socket.on('new_chat', function(msg) {
        io.emit('broadcast_message', { id: socket.id, message: msg });
    });
    
    socket.on('disconnect', function() {
        console.log('a user disconnected');
        message = `${socket.id} disconnected`;
        io.emit('user_disconnect', message);
    });
});