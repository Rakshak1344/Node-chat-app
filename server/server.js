const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage}= require('./utils/message');
const {isRealString}= require('./utils/validation');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
// console.log(__dirname+'/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));

//io connection>
io.on('connection',(socket)=>{
console.log('New user connected');


//
socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
           return callback('Name and Room Name are required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        // socket.emit from Admin text Welcome to the chat-app>
        socket.emit('newMessage',generateMessage('Admin','Welcome to chat-app'));
        //socket.broadcast.emit from Admin text New User joined>
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has Joined`));
        callback();
       });
//msg from client>
        socket.on('createMessage',(message,callback)=>{
            console.log('createMessage',message);
    
            io.emit('newMessage',generateMessage(message.from,message.text));
            callback();
          
        });

        socket.on('createLocationMessage',(coords)=>{
            io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
        });
   

   //disconnect server>
    socket.on('disconnect',()=>{
       var user = users.removeUser(socket.id);

       if(user){
        io.to(user.room).emit('updateUserList',users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
       }
    });
});



//------------PORT--listener>
server.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});

