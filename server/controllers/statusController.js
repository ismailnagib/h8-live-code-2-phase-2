const Status = require('../models/statusModel')

module.exports = {
    
    show: function (req, res) {
        Status.find({}, null, {
            sort: {
                createdAt: 'DESC'
            }
        })
        .populate('author')
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    add: function (req, res) {
        Status.create({
            content: req.body.content,
            author: req.userId
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    search: function (req, res) {
        Status.find({
            content: new RegExp('\S*'+req.body.keyword+'\S*', "i")
        }, null, {
            sort: {
                createdAt: 'DESC'
            }
        })
        .populate('author')
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}