var socket = io();

//connect call
socket.on('connect',function(){
        console.log('connected to server');
});

//disconnect call
socket.on('disconnect',function(){
    console.log('Disconnected from server');

});

//msg from server
socket.on('newMessage',function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        // console.log('newMessage',message);
        var li = jQuery('<li></li>');

        li.text(`${message.from} ${formattedTime}: ${message.text}`);
        jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My Current Location</a>');
        var formattedTime = moment(message.createdAt).format('h:mm a');

        li.text(`${message.from} ${formattedTime}: `);
        a.attr('href',message.url);
        li.append(a);

        jQuery('#messages').append(li);
});

//Form message chat box
jQuery('#message-form').on('submit',function(e){
        e.preventDefault();
        
        var messageTextBox = jQuery('[name=message]');
        socket.emit('createMessage',{
                from:'User',
                text: messageTextBox.val()
        },function(){
                messageTextBox.val('')
        });
});

//send location event
var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
        if(!navigator.geolocation){
                return alert('Your do not support geolocation ');
        }
        locationButton.attr('disabled','disabled').text('Sending location...')
        navigator.geolocation.getCurrentPosition(function (position){
                // console.log(position);
                locationButton.removeAttr('disabled').text('Send location');
                socket.emit('createLocationMessage',{
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                });
        },function(){
                locationButton.removeAttr('disabled').text('Send location');
                alert('Unable to fetch location')
        });
});
       

