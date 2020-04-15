import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import moment from 'moment';

const Navbar = ({ auth: { isAuthenticated, loading, isAdmin, user }, logout }) => {
  const [count, setCount] = useState('closed');

  const getGreetingTime = (time) => {
    var greeting = null; //return g

    if (!time || !time.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var currentHour = parseFloat(time.format('HH'));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      greeting = 'Afternoon';
    } else if (currentHour >= split_evening) {
      greeting = 'Evening';
    } else {
      greeting = 'Morning';
    }

    return greeting;
  };

  const humanizedGreeting = (userName) => {
    return `Good ${getGreetingTime(moment())} ${userName}`;
  };

  const greeting = () => {
    if (user !== null && !loading) {
      return <p className="greeting">{humanizedGreeting(user.fName)}</p>;
    }
  };

  const authLinks = (
    <ul className="navbar-ul">
      <li>
        <Link to="/tutorials">Tutorials</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> Profile
        </Link>
      </li>
      <li>
        <p onClick={logout} href="#!">
          <Link to="/">
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </p>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className="navbar-ul">
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/tutorials">Tutorials</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> Profile
        </Link>
      </li>
      <li>
        <p onClick={logout} href="#!">
          <Link to="/">
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </p>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-ul">
      {/* <li>
        <Link to="/profiles">Developers</Link>
      </li> */}
      <div></div>
      <div></div>
      <div></div>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const navSwitch = () => {
    if (isAdmin) {
      return adminLinks;
    } else {
      return authLinks;
    }
  };

  const handleClick = () => {
    const wrapperRef = React.createRef();
    wrapperRef.classList.toggle('is-nav-open');
  };

  return (
    <div className="navbar-container navbar-container-desktop">
      <nav className={`navbar-wrapper`}>
        {isAuthenticated ? (
          <Link className="logo-navbar" to="/dashboard">
            <i className="fas fa-code"></i> ePOINT
          </Link>
        ) : (
          <Link className="logo-navbar" to="/">
            <i className="fas fa-code"></i> ePOINT
          </Link>
        )}
        <div></div>
        {!loading && (
          <Fragment>
            {isAuthenticated ? greeting() : null}
            {isAuthenticated ? navSwitch() : guestLinks}
          </Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
