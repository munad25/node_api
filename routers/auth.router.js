const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signUp, signIn, oauthFacebook } = require("../controllers/user.controller");
const dotenv = require('dotenv');
dotenv.config();
router.post('/login', signIn);
router.post('/register', signUp);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_birthday'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), oauthFacebook);

module.exports = router