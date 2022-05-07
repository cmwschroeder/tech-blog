const seedUsers = require("./user-seeds");
const seedPosts = require("./post-seeds");

const sequelize = require('../config/connection');

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