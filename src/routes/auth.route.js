const express = require('express');
const authController = require('../controllers/auth.controller');
const passport = require('passport')

const router = express.Router();


// router.post('/login', passport.authenticate('local'), function(req, res){

// })
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        if (!user) {
            return res.status(401).json({ msg: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.status(200).json({ msg: 'Authentication successful'});
        });

    })(req, res, next);
});


router.post('/register', authController.regUser)


router.get('/', (req, res)=>{
    if(req.user){
        res.status(200).json({msg: 'Authenticated'})
    }else{
        res.status(401).json({msg : 'Not Authenticated'})
    }
})


router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err){ 
        res.status(400).json({msg: 'something went wrong'}) 
    }
    res.status(200).json({msg : 'success'});
  });
  
});
module.exports = router;