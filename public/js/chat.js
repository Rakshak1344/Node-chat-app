var socket = io();

function scrollToBottom(){
//selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
//heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

        if(clientHeight + scrollTop+newMessageHeight+ lastMessageHeight >= scrollHeight){
                messages.scrollTop(scrollHeight);               
        }
}

//connect call
socket.on('connect',function(){
        // console.log('connected to server');
        const params = jQuery.deparam(window.location.search);

        socket.emit('join',params,function(err){
                if(err){
                alert(err);
                window.location.href = '/';
                }else{
                        console.log('No error');
                }
        });
});

//disconnect call
socket.on('disconnect',function(){
    console.log('Disconnected from server');

});

socket.on('updateUserList',function(users){
        var ol = jQuery('<ol></ol>');

        users.forEach(function (user){
                ol.append(jQuery('<li></li>').text(user));
        });

        jQuery('#users').html(ol); 
});

//msg from server
socket.on('newMessage',function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template,{
                text: message.text,
                from: message.from,
                createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
      
});

socket.on('newLocationMessage',function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template,{
                from: message.from,
                url: message.url,
                createdAt: formattedTime
        });
        jQuery('#messages').append(html);
        scrollToBottom();
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
       

