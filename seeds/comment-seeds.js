const { Comment } = require('../models');

const commentData = [
    {
        content: "Nice Post",
        user_id: 2,
        post_id: 1,
    },
    {
        content: "Great Post",
        user_id: 3,
        post_id: 1,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;