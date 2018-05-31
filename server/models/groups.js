const mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    name: {type: String},
    members: [{}],
    band_image: {type: String},
    jam_space: {type: String},
    creator: {}
}, {timestamps: true});

module.exports = mongoose.model('Groups', groupSchema);