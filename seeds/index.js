//get the functions for creating posts and users
const seedUsers = require("./user-seeds");
const seedPosts = require("./post-seeds");
const seedComments = require("./comment-seeds");

const sequelize = require('../config/connection');

//clear the database and then create new tables for users and posts and give table entries
const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\nDATABASE SYNCED\n');

    await seedUsers();
    console.log('\nUsers Seeded\n');

    await seedPosts();
    console.log('\nPosts Seeded');

    await seedComments();
    console.log('\nComments Seeded');

    process.exit(0);
};

seedAll();