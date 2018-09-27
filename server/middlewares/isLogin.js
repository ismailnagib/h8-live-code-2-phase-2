const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: function (req, res, next) {
        let decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
        User.findOne({
            email: decoded.user
        })
        .then(data => {
            if (data) {
                req.userId = data._id
                next()
            } else {
                User.findOne({
                    username: decoded.user
                })
                .then(data2 => {
                    if (data2) {
                        req.userId = data2._id
                        next()
                    } else {
                        next('invalid token')
                    }
                })
                .catch(err => {
                    next(err)
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}