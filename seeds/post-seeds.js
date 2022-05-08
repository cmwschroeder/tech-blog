const { Post } = require('../models');

const postData = [
    {
        title: "First post",
        content: "This is my super cool first post",
        user_id: 1,
    },
    {
        title: "Thoughts on web dev",
        content: "Web development is super fun",
        user_id: 2,
    },
    {
        title: "Thoughts on blogs",
        content: "Blogs are pretty cool",
        user_id: 3,
    },
    {
        title: "How we are",
        content: "We are having a great time",
        user_id: 1,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;