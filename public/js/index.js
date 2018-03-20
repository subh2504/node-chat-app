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
socket.on('newLocationMessage',(message)=>{
    var li=jQuery('<li></li>');
    var a=jQuery('<a target = "_blank">My Location</a>');
    li.text(`${message.from} : `);
    a.attr('href',message.url);
    li.append(a);
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
    var messageTextBox =jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    },function (data) {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location')
locationButton.on('click',function () {

    if (!navigator.geolocation) {
        /* geolocation is available */
        alert('Geolocation not supported by browser');
    }
    locationButton.attr('disabled','disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function () {
       locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.')
        
    });
});