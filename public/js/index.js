var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.on('replyMessage', (reply) => {

        var formattedTime = moment(reply.createdAt).format('h:mm a')
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            text: reply.text,
            from: reply.from,
            createdAt: formattedTime
        });
        jQuery('#messages').append(html);
        // var li = jQuery('<li></li>');
        // li.text(`${reply.from} ${formattedTime} : ${reply.text}`);

        // jQuery('#messages').append(li);
    });


    socket.on('disconnect', function () {
        console.log('server stopped!!!!');
    });

    socket.on('newLocationMessage', function (reply) {

        var formattedTime = moment(reply.createdAt).format('h:mm a')
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            url: reply.url,
            from: reply.from,
            createdAt: formattedTime
        });
        jQuery('#messages').append(html);
    });

    jQuery('#message-form').on('submit', function (e) {
        e.preventDefault();

        var messageTextbox = jQuery('[name=message]');
        socket.emit('newMessage', {
            from: 'User',
            text: jQuery('[name=message]').val()
        }, function () {
            messageTextbox.val('')
        });
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('GeoLocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location....');

    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
})