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
            title: {
                type: String
            },
            videoUrl: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'users'
                    }
                }
            ],
            comments: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'users'
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String
                    },
                    avatar: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tutorial = mongoose.model('tutorial', TutorialSchema);
