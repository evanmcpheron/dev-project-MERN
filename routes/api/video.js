const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Videos');
const Profile = require('../../models/Profile');
const User = require('../../models/Tutorial');

// // @route    PUT api/videos/like/:id
// // @desc     Like a post
// // @access   Private
// router.put('/like/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         // Check if the post has already been liked
//         if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//                 .length > 0
//         ) {
//             return res.status(400).json({ msg: 'Post already liked' });
//         }

//         post.likes.unshift({ user: req.user.id });

//         await post.save();

//         res.json(post.likes);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;
