import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTutorial, deleteTutorial } from '../../actions/admin';
import VideoForm from './VideoForm';
import TutorialItem from './TutorialItem';

const Videos = (
  { getTutorial, deleteTutorial, history, admin: { tutorial, loading }, match },
  props
) => {
  useEffect(() => {
    getTutorial(match.params.id);
  }, [getTutorial]);

  return loading || tutorial === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <div className="top-section">
          <Link to="/admin" className="btn">
            Back To Admin
          </Link>
          <button
            className="btn btn-danger"
            onClick={(event) => {
              event.preventDefault();
              deleteTutorial(tutorial._id);
              history.goBack();
            }}
          >
            Delete
          </button>
        </div>
        <VideoForm videoId={tutorial._id} />
        {tutorial.video.map((vid) => (
          <TutorialItem key={vid._id} tutorial={vid} tutorialId={tutorial._id} />
        ))}
      </section>
    </Fragment>
  );
};

Videos.propTypes = {
  deleteTutorial: PropTypes.func.isRequired,
  getTutorial: PropTypes.func.isRequired,
  tutorial: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tutorial: state.tutorial,
  admin: state.admin,
});

export default connect(mapStateToProps, { getTutorial, deleteTutorial })(Videos);
