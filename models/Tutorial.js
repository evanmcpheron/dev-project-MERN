const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String,
    required: true,
  },
  video: [
    {
      title: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
      },
      position: {
        type: Number,
        required: true,
      },
      githubUrl: {
        type: String,
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
          avatar: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
