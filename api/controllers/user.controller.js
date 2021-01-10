const User = require('../../models/user');
const crypto = require('crypto');
const { sign } = require("jsonwebtoken");

// ********************************************* User Registration ******************************************* //
const register = (req, res) => {
    req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');

    User.findOne({ $or: [{ email: req.body.email, phone: req.body.phone }] }).then((user) => {
        if (user) {
            res.status(409).json({
                success: 0,
                message: 'User already Exits'
            })
        } else {
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            })

            user.save().then(() => {
                res.status(200).json({
                    success: 1,
                    message: 'User Added Successfully'
                })
            }).catch(error => {
                res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error!'
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            success: 0,
            message: 'Database Connection Error!'
        })
    });
}

// ********************************************* User Login ******************************************* //
const login = (req, res) => {
    var username = req.body.username;
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    User.findOne({ $or: [{ email: username, password: password }] }).then((user) => {
        if (user) {
            if (user.password == password) {
                const token = sign({ name: user.name }, "qwe1234", {
                    expiresIn: "1h"
                });
                res.status(200).json({
                    success: 1,
                    message: 'Login Successful!',
                    token
                })
            } else {
                res.status(400).json({
                    success: 0,
                    message: 'Password does not match'
                })
            }
        } else {
            res.status(403).json({
                success: 0,
                message: 'User Not Found!'
            })
        }
    })
}

// ********************************************* Get All Users ******************************************* //
const getallusers = (req, res) => {
    User.find().then((users) => {
        res.status(200).json({
            success: 1,
            data: users,
        })
    }).catch(error => {
        res.status(500).json({
            success: 0,
            message: 'Database Connection Error!'
        })
    })
}

module.exports = {
    register, login, getallusers
};