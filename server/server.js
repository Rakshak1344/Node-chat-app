const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage}= require('./utils/message');

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
// socket.emit from Admin text Welcome to the chat-app>
       socket.emit('newMessage',generateMessage('Admin','Welcome to chat-app'));
//socket.broadcast.emit from Admin text New User joined>
       socket.broadcast.emit('newMessage',generateMessage('Admin','New user Joined'));

//msg from client>
        socket.on('createMessage',(message,callback)=>{
            console.log('createMessage',message);
    
            io.emit('newMessage',generateMessage(message.from,message.text));
            callback('This is from the server');
            // socket.broadcast.emit('newMessage',{
            //     from:message.from,
            //     text:message.text,
            //     createdAt: new Date().getTime()
            // });
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

