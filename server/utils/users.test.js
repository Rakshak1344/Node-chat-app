const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
    //seeding
    beforeEach('Users',()=>{
        users =new Users();
        users.users=[{
            id:'1',
            name:'Service1',
            room: 'Car'
        },{
            id:'2',
            name:'Service2',
            room: 'car'
        },{
            id:'3',
            name:'Service3',
            room: 'car'
        }];
    })

    it('Should add new user',()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'Rakshak',
            room: 'The Office Fans'
        };
        var resUser= users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should return names for car',()=>{
        var userList = users.getUserList('car');
        expect(userList).toEqual(['Service1','Service2','Service3']);
    });
});