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
});

       

