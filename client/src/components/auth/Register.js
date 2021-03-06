import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { fName, lName, email, password, password2 } = formData;

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ fName, lName, email, password });
    }
  };

  // REDIRECT IF SUCCESSFULL REGISTER
  if (isAuthenticated) {
    return <Redirect to="/tutorials" />;
  }

  return (
    <Fragment className="register-wrapper">
      <section className="container" style={{ marginTop: '6rem' }}>
        <h2>Sign Up</h2>
        <p>
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form onSubmit={onSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="First Name"
              name="fName"
              value={fName}
              onChange={(event) => onChange(event)}
              required
            />
            <span></span>
            <div className="my2"></div>
            <input
              type="text"
              placeholder="Last Name"
              name="lName"
              value={lName}
              onChange={(event) => onChange(event)}
              required
            />
            <span></span>
            <div className="my2"></div>
          </div>
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
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={(event) => onChange(event)}
              minLength="6"
            />
            <span></span>
            <div className="my2"></div>
          </div>
          <input type="submit" className="btn btn-success" value="Register" />
        </form>
        <p className="mt2">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
