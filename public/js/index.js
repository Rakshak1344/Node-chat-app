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
        console.log('newMessage',message);
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);
        
        jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My Current Location</a>');

        li.text(`${message.from}: `);
        a.attr('href',message.url);
        li.append(a);

        jQuery('#messages').append(li);
});

//Form message chat box
jQuery('#message-form').on('submit',function(e){
        e.preventDefault();
       
        socket.emit('createMessage',{
                from:'User',
                text: jQuery('[name=message]').val()
        },function(){

        });
});

//send location event
var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
        if(!navigator.geolocation){
                return alert('Your do not support geolocation ');
        }
        
        navigator.geolocation.getCurrentPosition(function (position){
                // console.log(position);
                socket.emit('createLocationMessage',{
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                });
        },function(){
                alert('Unable to fetch location')
        });
});
       

