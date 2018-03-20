var generateMessage = (from,text) => {
    return {
        from,
        text,
        createdDate:new Date().getTime()
    };
};

var generateLocationMessage = (from,latitude,longitude) => {
    return{
        from,
        url:`http://www.google.com/maps?q=${latitude},${longitude}`,
        createdDate:new Date().getTime()
    };
};

module.exports={
    generateMessage,
    generateLocationMessage
};