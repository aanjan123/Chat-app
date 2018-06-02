const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.emit('replyMessage', {
        text: 'This must work',
        from: 'Admin',
        _createdAt: new Date().toString()
    });

    socket.broadcast.emit('replyMessage',{
        text: 'Admin',
        from: 'New user joined',
        _createdAt: new Date().toString()
    })

    socket.on('newMessage', (messgae) => {
        console.log('new Message', messgae);

        io.emit('replyMessage', {
            text: messgae.text,
            from: messgae.from,
            _createdAt: new Date().toString()
        });

    });



});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});