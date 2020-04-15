import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import background from '../../img/landing.jpg';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/tutorials" />;
  }

  return (
    <section className="landing-wrapper">
      <div className="shape-path">
        <div className="text-position">
          <h1>ePoint.io</h1>
          <p>Create a developer profile/portfolio, share posts, and learn</p>
          <div className="action-btns">
            <Link className="btn" to="/register">
              Sign Up
            </Link>
            <Link className="btn btn-two" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapPropsToState = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapPropsToState, {})(Landing);
