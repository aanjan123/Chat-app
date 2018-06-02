const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {newMessage, generateLocationMessage} = require('./utils/message');
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

    socket.emit('replyMessage', newMessage('Admin','Welcome to chat App'));

    socket.broadcast.emit('replyMessage',newMessage('Admin','New User Joined'));

    socket.on('newMessage', (messgae) => {
        console.log('new Message', messgae);

        io.emit('replyMessage',newMessage(messgae.from , messgae.text));

    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude))
    });

});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});