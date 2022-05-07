//get the functions for creating posts and users
const seedUsers = require("./user-seeds");
const seedPosts = require("./post-seeds");

const sequelize = require('../config/connection');

//clear the database
const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\nDATABASE SYNCED\n');

    await seedUsers();
    console.log('\nUsers Seeded\n');

    await seedPosts();
    console.log('\nPosts Seeded')

    process.exit(0);
};

seedAll();