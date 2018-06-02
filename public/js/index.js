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

socket.on('newLocationMessage',function(message){
    var li =  jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
    
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

var locationButton = jQuery('#send_location');

locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('GeoLocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });

    }, function(){
        alert('Unable to fetch location');
    });
})