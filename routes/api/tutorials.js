const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const url = require('url');
const querystring = require('querystring');

const Tutorial = require('../../models/Tutorial');
const Video = require('../../models/Videos');

// @route    POST api/tutorial
// @desc     Post new tutorial series
// @access   Admin
router.post('/', async (req, res) => {
    const { title, description, thumbnailURL, date } = req.body;

    try {
        let tutorial = await Tutorial.findOne({ title });

        if (tutorial) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Tutorial name already exists' }] });
        }

        tutorial = new Tutorial({
            title,
            description,
            thumbnailURL,
            date
        });

        await tutorial.save();
        res.send(tutorial);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/tutorial
// @desc     Get all tutorials
// @access   Public
router.get('/', async (req, res) => {
    try {
        const tutorials = await Tutorial.find().populate('tutorial', [
            'title',
            'description',
            'thumbnailURL'
        ]);
        res.json(tutorials);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/tutorial/video/:id
// @desc     Add a video to tutorial
// @access   Admin
router.post('/video/:id', auth, async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);

        const video = new Video({
            tutorialId: req.params.id,
            title: req.body.title,
            videoUrl: req.body.videoUrl
        });

        // const videoID = Video.findById('5e703e235a4d7a666358da80');

        await video.save(function(error, video) {
            if (error) {
                console.error(error);
            } else {
                tutorial.video.push(video);
                tutorial.save(function(error, tutorial) {
                    return res.json(tutorial);
                });
            }
        });

        // var r = new Recipe();

        // r.name = 'Blah';
        // r.ingredients.push('mongo id of ingredient');

        // r.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/tutorial/video/:id
// @desc     Comment on a tutorial
// @access   Private
router.post(
    '/comment/:id',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const video = await Video.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            video.comments.unshift(newComment);

            await video.save();

            res.json(video.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
