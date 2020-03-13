const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    tutorial: {
        type: Schema.Types.ObjectId,
        ref: 'tutorial'
    },
    title: {
        type: String
    },
    videoUrl: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
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
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('video', VideoSchema);
