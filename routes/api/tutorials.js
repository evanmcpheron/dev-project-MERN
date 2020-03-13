// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const auth = require('../../middleware/auth');

// const Tutorial = require('../../models/Tutorials');
// const Profile = require('../../models/Profile');
// const User = require('../../models/User');

// // @route    POST api/posts
// // @desc     Create a post
// // @access   Private
// router.post('/upload', [auth], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const videoArr = req.body.videos.split(',').map(video => video.trim());

//         const newTutorial = new Tutorial({
//             title: req.body.title,
//             thumbnail: req.body.thumbnail,
//             description: req.body.description,
//             videos: videoArr
//         });

//         const tutorial = await newTutorial.save();

//         res.json(tutorial);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;
