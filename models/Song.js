const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: Number,
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Song', songSchema);
