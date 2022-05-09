const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
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
                user: {
                    user_id: post.user.id,
                    name: post.user.name,
                },
            }
        });
        
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            posts: posts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    const postId = req.params.id;

    const postData = await Post.findByPk(postId, {
        include: [{ model: User }],
    });

    const userPost = postData.get({ plain: true});

    const post = {
        id: userPost.id,
        title: userPost.title,
        content: userPost.content,
        date_created: (new Date(userPost.createdAt).getMonth() + 1) + "/" + (new Date(userPost.createdAt).getDate()) + '/' + (new Date(userPost.createdAt).getFullYear()),
        user_id: userPost.user_id,
        user: {
            user_id: userPost.user.id,
            name: userPost.user.name,
        },
    };

    const commentData = await Comment.findAll({
        include: [{ model: User }],
        where: { post_id: req.params.id},
    }).catch((err) => { 
        res.json(err);
    });

    const userComments = commentData.map((comment) => comment.get({ plain: true}));

    const comments = userComments.map((comment) => {
        return {
            content: comment.content,
            user: comment.user.name,
            date_created: (new Date(comment.createdAt).getMonth() + 1) + "/" + (new Date(comment.createdAt).getDate()) + '/' + (new Date(comment.createdAt).getFullYear()),
        };
    });

    res.render('comment', {
        loggedIn: req.session.loggedIn,
        post: post,
        comments: comments,
    });
});

router.post('/posts/:id', async (req, res) => {
    try {
        console.log(req.body);
        const commentData = await Comment.create({
            content: req.body.comment,
            user_id: req.session.userId,
            post_id: req.params.id,
        });

        res.json("Comment added");
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('login');
})

module.exports = router;