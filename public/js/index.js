var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.on('replyMessage',(reply)=>{
        console.log('reply :',reply);
    });

});

socket.on('disconnect', function () {
    console.log('server stopped!!!!');
});