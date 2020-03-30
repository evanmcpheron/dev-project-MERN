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

        const tutorials = await Tutorial.find().populate('tutorial', [
            'title',
            'description',
            'thumbnailURL'
        ]);

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

// @route    GET api/tutorial/:id
// @desc     Get tutorial by ID
// @access   Private
router.get('/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);

        if (!tutorial) {
            return res.status(404).json({ msg: 'Tutorial not found' });
        }

        res.json(tutorial);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tutorial not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/tutorial/:id
// @desc     Get tutorial by ID
// @access   Private
router.delete('/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findOneAndDelete({
            _id: req.params.id
        });
        const tutorials = await Tutorial.find().populate('tutorial', [
            'title',
            'description',
            'thumbnailURL'
        ]);

        if (!tutorial) {
            return res.status(404).json({ msg: 'Tutorial not found' });
        }

        res.json(tutorials);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tutorial not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    GET api/tutorial/video/:id
// @desc     Get tutorial by ID
// @access   Private
router.get('/video/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);

        if (!tutorial) {
            return res.status(404).json({ msg: 'Tutorial not found' });
        }

        res.json(tutorial.video);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tutorial not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    POST api/tutorial/video/:id
// @desc     Add a video to tutorial
// @access   Admin
router.post('/video/:id', auth, async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);

        const position = req.body.position;

        const video = {
            tutorialId: req.params.id,
            title: req.body.title,
            position: req.body.position,
            videoUrl: req.body.videoUrl,
            githubUrl: req.body.githubUrl
        };

        tutorial.video.splice(position - 1, 0, video);

        await tutorial.save();

        res.json(tutorial);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/tutorial/video/:id
// @desc     Add a video to tutorial
// @access   Admin
router.delete('/videos/:id/:video_id', auth, async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);

        for (let i = 0; i < tutorial.video.length; i++) {
            if (tutorial.video[i]._id == req.params.video_id) {
                const index = tutorial.video.indexOf(tutorial.video[i]);
                // res.json({ data: index });
                tutorial.video.splice(index, 1);

                await tutorial.save();
                return res.json({ data: tutorial.video });
            }
            console.log(tutorial.video[i]._id);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/tutorial/video/:id/:vidId
// @desc     Comment on a tutorial
// @access   Private
router.post(
    '/comment/:id/:vidId',
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
            const tutorial = await Tutorial.findById(req.params.id);
            const specificVideo = tutorial.video;

            const newComment = {
                text: req.body.text,
                name: user.fName + ' ' + user.lName,
                avatar: user.avatar,
                user: req.user.id
            };

            // res.send(req.params.vidId);

            for (let i = 0; i < specificVideo.length; i++) {
                if (specificVideo[i]._id == req.params.vidId) {
                    specificVideo[i].comments.unshift(newComment);

                    await tutorial.save();

                    return res.json(tutorial);
                }
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/tutorial/comment/:id/:video_id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:video_id/:comment_id', auth, async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);

        // Pull out comment
        const video = tutorial.video.find(
            video => video.id === req.params.video_id
        );

        const comment = video.comments.find(
            comment => comment.id === req.params.comment_id
        );

        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get remove index
        const removeIndex = video.comments
            .map(comment => comment._id.toString())
            .indexOf(req.params.comment_id);

        video.comments.splice(removeIndex, 1);

        await tutorial.save();

        res.json(tutorial);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
