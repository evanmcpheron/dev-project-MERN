import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import background from '../../img/landing.jpg';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing-wrapper">
      <div>
        <div>
          <h1>ePoint.io</h1>
          <p>Create a developer profile/portfolio, share posts, and learn</p>
          <div>
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Login</Link>
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
