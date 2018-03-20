var socket= io();
socket.on('connect',()=>{
    console.log("Connected to server");
});
socket.on('disconnect',()=>{
    console.log("Disconnected to server");
});

socket.on('newMessage',(message)=>{
    console.log("New Message",message);
    var li=jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// },function (data) {
//     console.log('Got it.',data);
// });


jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function (data) {
        console.log('Got it.',data);
    });
});