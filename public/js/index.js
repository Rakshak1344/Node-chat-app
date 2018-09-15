var socket = io();
socket.on('connect',function(){
        console.log('connected to server');
});



//msg from server
socket.on('newMessage',function(message){
        console.log('From Server',message);
});

        //disconnect call
        socket.on('disconnect',function(){
            console.log('Disconnected from server');
        });

