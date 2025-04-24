const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);
