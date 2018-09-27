var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

var Status = mongoose.model('Status', statusSchema)
module.exports = Status