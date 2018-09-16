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

// socket.emit('createMessage',{
//         from :'frank',
//         text: 'HI'
// },function(data){
//         console.log('Got it',data);
// });

jQuery('#message-form').on('submit',function(e){
        e.preventDefault();
        socket.emit('createMessage',{
                from:'User',
                text: jQuery('[name=message]').val()
        },function(){

        });
});

       

