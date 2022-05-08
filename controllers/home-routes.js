const router = require('express').Router();

router.get('/', (req, res) => {
    try {
        res.render('homepage', {
        logged_in: req.session.loggedink,
    });
    } catch (err) {
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