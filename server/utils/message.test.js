var expect = require('expect');
var {generateMessage} = require('./message')

describe('generateMessage',() => {
    it('should generate correct message object',() => {
        var from ='Subhash';
        var text = 'Hi';
        var message = generateMessage(from,text);
        console.log(message)
        expect(message.createdDate).toBeA('number');
        expect(message).toInclude({from,text});

    });
});