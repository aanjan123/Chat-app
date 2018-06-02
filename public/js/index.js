var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to:'bis@gmail.com',
        text:'this is email',
        created_at: new Date().toString()        
    });

    socket.emit('createMessage',{
        to:'aanjan@gmail.com',
        text:'this is email',
        created_at: new Date().toString()    
    });

    socket.on('reply', function(reply){
        console.log('reply',reply);
    });

});

socket.on('disconnect', function () {
    console.log('server stopped!!!!');
});

socket.on('newEmail', function (email) {
    console.log('New Email', email);
});