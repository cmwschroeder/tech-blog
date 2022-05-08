const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.userId},
        }).catch((err) => { 
            res.json(err);
        });

        const posts = postData.map((post) => post.get({ plain: true}));
        
        res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        posts: posts,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;