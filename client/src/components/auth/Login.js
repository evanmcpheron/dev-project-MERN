import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    login(email, password);
  };

  // REDIRECT IF LOGGED IN
  if (isAuthenticated) {
    return <Redirect to="/tutorials" />;
  }

  return (
    <Fragment>
      <section className="container" style={{ marginTop: '6rem' }}>
        <h2>Sign In</h2>
        <p>
          <i className="fas fa-user"></i> Log into your account
        </p>
        <form onSubmit={onSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => onChange(event)}
              name="email"
              required
            />
            <span></span>
            <div className="my2"></div>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(event) => onChange(event)}
              minLength="6"
            />
            <span></span>
            <div className="my2"></div>
          </div>
          <input type="submit" value="Sign In" className="btn btn-success" />
        </form>
        <p className="mt2">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
