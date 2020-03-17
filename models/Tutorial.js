const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailURL: {
        type: String,
        required: true
    },
    video: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'video'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
