const path=require('path');
const express = require('express');
const socketIO = require('socket.io');
const  http=require('http');
const publicPath=path.join(__dirname,'../public');
const port= process.env.PORT||8000;
const {generateMessage,generateLocationMessage} = require('./utils/message')

var app=express();
app.use(express.static(publicPath));
var server = http.createServer(app);



var io=socketIO(server);
io.on('connection',(socket)=>{
    console.log("New user connected");
    socket.emit("newMessage",generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit("newMessage",{
        'from':'Admin',
        'text':'New User Joined',
        'createAt':new Date().getTime()
    });

    socket.on('createMessage',(message,callback)=>{
        console.log("createMessage",message);
        io.emit("newMessage",generateMessage(message.from,message.text));
        callback();
        // socket.broadcast.emit("newMessage",{
        //     'from':message.from,
        //     'text':message.text,
        //     'createAt':new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log("User was disconnected");
    });
});


server.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});
//console.log(__dirname);