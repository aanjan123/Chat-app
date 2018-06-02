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

    socket.emit('newEmail', {
        from:'aanjanBhuwan@gmail.com',
        text:'Hey, what is going on',
        created_at: new Date().toString()
    });

    socket.on('createEmail', (newEmail) => {
        console.log('Create Email', newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Create Email', newMessage);
    });

    socket.emit('reply',{
        from:'Bhuwan@gmail.com',
        text:'Hey, what is going on in reply',
        created_at: new Date().toString()
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});