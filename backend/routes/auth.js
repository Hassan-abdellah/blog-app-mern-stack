const router = require('express').Router();

const passport = require('passport');


const CLIENT_URI = process.env.CLIENT_URI;
// const CLIENT_URI = "http://localhost:3000/";

router.get('/login/success', (req , res) => {

    if(req.user){
        res.status(200).json({ 
            success: true,
            message: 'success',
            user: req.user,
            // cookies: req.cookies
        })
    }
});
router.get('/login/failed', (req , res) => {
    res.status(401).json({ 
        success: false,
        message: 'failed to authenticate'})
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_URI);
})
router.get('/google', passport.authenticate('google', {scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URI,
    failureRedirect: '/login/failed'
}))

module.exports = router;