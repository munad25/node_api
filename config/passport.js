const passport = require('passport');
const dotenv = require("dotenv");
const facebook = require('passport-facebook');
const facebookStrategy = facebook.Strategy;
const google = require('passport-google-oauth');
const googleStrategy = google.Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const models = require('../models/index');
const { ExtractJwt } = require('passport-jwt');

dotenv.config();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ["emails", "name", 'birthday']
},
    function (accessToken, refreshToken, profile, cb) {
        const { email, first_name, last_name, birthday } = profile._json;
        models.User.findOrCreate({
            where: { email: email },
            defaults: {
                firstName: first_name,
                lastName: last_name,
                password: null,
                birthDate: new Date(birthday),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        cb(null, profile);
    }
))
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        // Cari user dengan id yan tersimpan pada jwt
        const user = await models.User.findByPk(payload.sub);

        // jika user ditemukan update user
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        req.user = user;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));
// Todo Implement Google Oauth
// passport.use(new googleStrategy({

// }))