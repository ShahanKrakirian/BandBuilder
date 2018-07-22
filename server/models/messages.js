const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    between: [{}],
    content: [{
        message: String,
        sender: {}
    }]
}, {timestamps: true});

module.exports = mongoose.model('Messages', messageSchema);