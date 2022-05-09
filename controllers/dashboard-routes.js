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

        const userPosts = postData.map((post) => post.get({ plain: true}));

        const posts = userPosts.map((post) => {
            return {
                id: post.id,
                title: post.title,
                content: post.content,
                date_created: (new Date(post.createdAt).getMonth() + 1) + "/" + (new Date(post.createdAt).getDate()) + '/' + (new Date(post.createdAt).getFullYear()),
                user_id: post.user_id,
            }
        });
        
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

router.get('/update/:id', async (req, res) => {
    const postId = req.params.id;

    const postData = await Post.findByPk(postId);

    const post = postData.get({ plain: true});

    res.render('update', {
        loggedIn: req.session.loggedIn,
        post: post,
    });
});

module.exports = router;