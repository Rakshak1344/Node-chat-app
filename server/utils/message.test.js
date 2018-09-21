// var expect = require('expect');
// var {generateMessage,generateLocationMessage} = require('./message');

// describe('Generate Message',()=>{
//     it('should generate correct message object',()=>{
//         var from = 'Rak';
//         var text = 'Some text',
//         var msg = generateMessage(from,text);

//         expect(msg.createdAt).toBeA('number');
//         expect(msg).toInclude({from,text});
        
//     });
// });

// describe('generateLocationMessage',()=>{
//     it('should generate correct location object',()=>{
//         var from = 'Rak',
//         var latitude = 12;
//         var longitude = 77;
//         var url = 'https://www.google.com/maps?q=12.967944,77.578250';
//         var msg = generateLocationMessage(from,latitude,longitude);
//         expect(msg.createdAt).toBeA('number');
//         expect(msg).toInclude({from,url});
//     });
// });