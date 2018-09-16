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
// socket.emit from Admin text Welcome to the chat-app>
       socket.emit('newMessage',{
            from:'Admin',
            text:'Welcome to chat-app',
            createdAt: new Date().getTime()
       });
//socket.broadcast.emit from Admin text New User joined>
       socket.broadcast.emit('newMessage',{
            from:'Admin',
            text:'New user Joined',
            createdAt: new Date().getTime()
        });

//msg from client>
        socket.on('createMessage',(message)=>{
            console.log('createMessage',message);
    
            io.emit('newMessage',{
                from: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            });
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

