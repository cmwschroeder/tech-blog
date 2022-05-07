const { User } = require('../models');

const userData = [
    {
        name: 'user',
        email: 'user@email.com',
        password: 'password'
    },
    {
        name: 'second',
        email: 'second@email.com',
        password: 'password'
    },
    {
        name: 'tester',
        email: 'tester@email.com',
        password: 'password'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;