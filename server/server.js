const path=require('path');
const express = require('express');
const socketIO = require('socket.io');
const  http=require('http');
const publicPath=path.join(__dirname,'../public');
const port= process.env.PORT||8000;

var app=express();
app.use(express.static(publicPath));
var server = http.createServer(app);



var io=socketIO(server);
io.on('connection',(socket)=>{
    console.log("New user connected");
    socket.emit("newMessage",{
        'from':'subhashhardaha@gmail.com',
        'text':'Hey. Whats going on',
        'createAt':Date()
    });

    socket.on('createMessage',(message)=>{
        console.log("createMessage",message);
    });

    socket.on('disconnect',()=>{
        console.log("User was disconnected");
    });
});


server.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});
//console.log(__dirname);