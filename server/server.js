const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
// console.log(__dirname+'/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

//io connection>
io.on('connection',(socket)=>{
    console.log('New user connected');


    //msg from client>
    socket.on('createMessage',(message)=>{
        console.log('From Client',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime() 
        });
    });

   

   //disconnect server>
    socket.on('disconnect',()=>{
        console.log('Client disconnected');
    });
});



//------------PORT--listener>
server.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});

