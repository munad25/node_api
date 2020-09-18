'use strict'
const jwt = require('jsonwebtoken');
const models = require('../models/index');
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const User = models.User;
dotenv.config();

function signToken(user) {
    return jwt.sign({
        iss: 'CodeWorker',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, process.env.JWT_SECRET);
}


module.exports = {
    oauthFacebook: async (req, res) => {
        const user = await User.findOne({ 'email': req.user._json.email });
        const token = signToken(user);
        res.status(200).json({
            user: user,
            token: 'Bearer ' + token
        });
    },
    signIn: async (req, res) => {
        // Todo
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ 'email': email }).then(user => {
            if (!user) {
                return res.status(404).json({ error: "Email belum terdaftar!" });
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const token = signToken(user);
                    res.status(200).json({
                        user: user,
                        token: 'Bearer ' + token
                    });
                }
            });
        })
    },
    signUp: async (req, res) => {
        const { email, password, firstName, lastName, birthDate } = req.body;
        const password_hash = await bcrypt.hashSync(password);
        User.findOne({
            'email': email
        }).then(user => {
            if (!user) {
                return res.status(403).json({ error: 'Email already registered!' })
            }
            const newUser = User.findOrCreate({
                where: { id: userId },
                defaults: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password_hash,
                    birthDate: new Date(birthDate),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });
            if (newUser)
                res.status(200).json({ success: true, user: newUser });
        });
    },
    updateUser: async (req, res) => {
        const { email, password, firstName, lastName, birthDate } = req.body;
        const userId = req.params.id;
        const password_hash = await bcrypt.hashSync(password);

        const userUpdated = await User.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password_hash,
            birthDate: new Date(birthDate),
            createdAt: new Date(),
            updatedAt: new Date(),

        }, { where: { 'id': userId } });

        if (userUpdated)
            res.send({
                'status': 'OK',
                'messages': 'User berhasil diupdate',
                'data': userUpdated,
            });
        // res.send(user);

    },
    deleteUser: async (req, res) => {
        const userId = req.params.id;
        const userDeleted = await User.destroy({
            where: {
                id: userId
            }
        });
        if (userDeleted)
            res.send({
                'status': 'OK',
                'messages': 'User berhasil dihapus',
                'data': userDeleted,
            });
    },
    getallUsers: async (req, res) => {
        const users = await User.findAll({});
        res.send(users);
    }
}