var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.on('replyMessage',(reply)=>{
        console.log('reply :',reply);

        var li = jQuery('<li></li>');
        li.text(`${reply.from} : ${reply.text}`);

        jQuery('#messages').append(li);
    });
    

socket.on('disconnect', function () {
    console.log('server stopped!!!!');
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('newMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    }, function(){

    });
});
});