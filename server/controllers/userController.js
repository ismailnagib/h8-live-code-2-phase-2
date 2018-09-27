const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = {
    
    register: function (req, res) {
        User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(data => {
            res.status(201).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    login: function (req, res) {
        User.findOne({
            email: req.body.user,
            password: req.body.password
        })
        .then(user => {
            if (user) {
                jwt.sign({user:req.body.user}, process.env.JWT_KEY, (err, token) => {
                    if (err) {
                        res.status(500).json({message: err})
                    } else {
                        res.status(200).json({token: token})
                    }
                })
            } else {
                User.findOne({
                    username: req.body.user,
                    password: req.body.password
                })
                .then(user => {
                    if (user) {
                        jwt.sign({user:req.body.user}, process.env.JWT_KEY, (err, token) => {
                            if (err) {
                                res.status(500).json({message: err})
                            } else {
                                res.status(200).json({token: token})
                            }
                        })
                    } else {
                        res.status(500).json({message: 'invalid email/password'})
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    showRandom: function (req, res) {
        User.count().exec(function (err, count) {
            if (err) {
                res.status(500).json({message: err})
            } else {
                let random1 = Math.floor(Math.random() * count)

                let random2 = Math.floor(Math.random() * count)
                while (random2 === random1) {
                    random2 = Math.floor(Math.random() * count)
                }

                let random3 = Math.floor(Math.random() * count)
                while (random3 === random1 || random3 === random2) {
                    random3 = Math.floor(Math.random() * count)
                }
    
                let randomArr = []
    
                User.findOne({
                    _id: {
                        $ne: req.userId
                    }
                }).skip(random1).exec(
                    function (err, result1) {
                        if (err) {
                            res.status(500).json({message: err})
                        } else {
                            User.findOne({
                                _id: {
                                    $ne: req.userId
                                }
                            }).skip(random2).exec(
                                function (err, result2) {
                                    if (err) {
                                        res.status(500).json({message: err})
                                    } else {
                                        User.findOne({
                                            _id: {
                                                $ne: req.userId
                                            }
                                        }).skip(random3).exec(
                                            function (err, result3) {
                                                if (err) {
                                                    res.status(500).json({message: err})
                                                } else {
                                                    randomArr.push(result1)
                                                    randomArr.push(result2)
                                                    randomArr.push(result3)
                                                    console.log(randomArr)
                                                    res.status(200).json({data: randomArr})
                                                }
                                            }
                                        )
                                        
                                    }
                                }
                            )
                        }
                    }
                )  
            }
        })
    }
}