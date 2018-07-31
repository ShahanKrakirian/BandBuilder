const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    between: [String],
    content: [{
        message: String,
        sender: String
    }]
}, {timestamps: true});

module.exports = mongoose.model('Messages', messageSchema);