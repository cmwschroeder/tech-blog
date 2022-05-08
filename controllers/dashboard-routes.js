const router = require('express').Router();
const { User, Post } = require('../models');

//get route for the dashboard page, will show user's posts with a button to go to a different page
//that will have input fields for the user to create a post
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

router.get('/create', (req, res) => {
    res.render('create', {
        loggedIn: req.session.loggedIn,
    });
});

router.post('/create', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId
        });

        res.redirect('/dashboard');
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;