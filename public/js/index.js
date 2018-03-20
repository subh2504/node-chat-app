var socket= io();
socket.on('connect',()=>{
    console.log("Connected to server");

    socket.emit("createMessage",{
        'to':'someone@mail.id',
        'text':'Some Text'
    });
});
socket.on('disconnect',()=>{
    console.log("Disconnected to server");
});

socket.on('newMessage',(message)=>{
    console.log("New Message",message);
});