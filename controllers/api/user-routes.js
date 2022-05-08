const router = require('express').Router();
const req = require('express/lib/request');
const { User } = require('../../models');

//router that handles login
router.post('/login', async (req, res) => {
    try{
        //get the user that matches the email we recieved
        const userData = await User.findOne({where: { email: req.body.email}});
    
        //send a response back if the user doesn't exist in the database
        if(!userData) {
            res.status(400).json("Incorrect email or password, please try again");
            return;
        }

        console.log(req.body);
        const validPassword = userData.checkPassword(req.body.password);
        console.log(validPassword);

        //now that we have the number we need to check the password
        if(!validPassword) {
            res.status(404).json("Incorrect email or password, please try again");
            return;
        }
    
        //login was valid, save username and logged in status to session storage
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
          
            res.json("Logged in");
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route that handles logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;