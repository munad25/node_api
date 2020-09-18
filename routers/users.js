const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getallUsers, deleteUser, updateUser } = require("../controllers/user.controller");
require('../config/passport');
const passportJWT = passport.authenticate('jwt', { session: false });
require('../config/passport');

router.get('/profile', passportJWT, (req, res) => {
    res.json({
        'user': req.user
    });
})

router.get('/', getallUsers);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router