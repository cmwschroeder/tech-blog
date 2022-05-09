const router = require('express').Router();
const { User, Post } = require('../models');

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

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('login');
})

module.exports = router;