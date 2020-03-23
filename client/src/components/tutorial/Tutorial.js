import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getTutorial } from '../../actions/tutorial';
import VideoItem from './VideoItem';
import { VideoPlayer } from '../videoPlayer/VideoPlayer';
import VideoPlayerTwo from '../videoPlayer/src/demo/VideoPlayerTwo';

const Tutorial = ({ getTutorial, tutorial: { tutorial, loading }, match }) => {
    useEffect(() => {
        getTutorial(match.params.id);
    }, [getTutorial]);

    console.log(tutorial, 'Tutorial.js');

    return loading || tutorial === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/tutorials" className="btn">
                Back To Tutorials
            </Link>
            <h1>{tutorial.title}</h1>
            <div className="comments">
                <VideoPlayerTwo videos={tutorial.video} tutorial={tutorial} />
                {/* {tutorial.video.map(vid => (
                    <button>
                        <VideoItem
                            key={vid._id}
                            video={vid}
                            tutorialId={tutorial._id}
                        />
                        <p>{vid.title}</p>
                    </button>
                ))} */}
            </div>
        </Fragment>
    );
};

Tutorial.propTypes = {
    getTutorial: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tutorial: state.tutorial
});

export default connect(mapStateToProps, { getTutorial })(Tutorial);
