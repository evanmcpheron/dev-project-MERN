import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTutorials } from '../../actions/tutorial';
import Spinner from '../layout/Spinner';
import TutorialItem from './TutorialItem';

const Tutorials = ({ getTutorials, tutorial: { tutorials, loading } }) => {
  useEffect(() => {
    getTutorials();
  }, [getTutorials]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h1>Tutorials</h1>

        <div className="tutorial-video-wrapper">
          {tutorials.map((tut) =>
            tut.status === 'Published' ? (
              <div key={tut._id}>
                <TutorialItem
                  style={{ display: 'none' }}
                  showActions={true}
                  key={tut._id}
                  tutorial={tut}
                />
              </div>
            ) : null
          )}
        </div>
      </section>
    </Fragment>
  );
};

Tutorials.propTypes = {
  getTutorials: PropTypes.func.isRequired,
  tutorial: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tutorial: state.tutorial,
});

export default connect(mapStateToProps, { getTutorials })(Tutorials);
