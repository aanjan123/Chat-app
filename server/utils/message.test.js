var expect = require('expect');

var {newMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', (next) => {
        var from = 'Bhuwan';
        var text = 'this is a test text';
        var message = newMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });

    })
})