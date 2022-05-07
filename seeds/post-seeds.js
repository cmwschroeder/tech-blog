const { Post } = require('../models');

const postData = [
    {
        content: "This is my super cool first post",
        date_created: "8/7/21",
        user_id: 1,
    },
    {
        content: "Web development is super fun",
        date_created: "11/13/21",
        user_id: 2,
    },
    {
        content: "Blogs are pretty cool",
        date_created: "12/12/21",
        user_id: 3,
    },
    {
        content: "We are having a great time",
        date_created: "2/3/22",
        user_id: 1,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;