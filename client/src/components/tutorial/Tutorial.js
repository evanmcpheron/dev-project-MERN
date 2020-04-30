import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import { getTutorial } from '../../actions/tutorial';
import VideoItem from './VideoItem';
import { VideoPlayer } from '../videoPlayer/VideoPlayer';
import VideoPlayerTwo from '../videoPlayer/src/components/VideoPlayerTwo';

const Tutorial = ({ getTutorial, auth, tutorial: { tutorial, loading }, match }) => {
  useEffect(() => {
    getTutorial(match.params.id);
  }, [getTutorial]);

  return loading || tutorial === null || auth.user === undefined ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h4 className="mt2">{tutorial.title}</h4>
        <div>
          <VideoPlayerTwo videos={tutorial.video} tutorial={tutorial} />
        </div>
      </section>
    </Fragment>
  );
};

Tutorial.propTypes = {
  getTutorial: PropTypes.func.isRequired,
  tutorial: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tutorial: state.tutorial,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTutorial })(Tutorial);
