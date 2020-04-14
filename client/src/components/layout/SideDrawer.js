import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import moment from 'moment';

const SideDrawer = ({ auth: { isAuthenticated, loading, isAdmin, user }, logout, show, click }) => {
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
        <Link to="/tutorials" onClick={click}>
          Tutorials
        </Link>
      </li>
      <li>
        <Link to="/posts" onClick={click}>
          Posts
        </Link>
      </li>
      <li>
        <Link to="/profiles" onClick={click}>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/dashboard" onClick={click}>
          <i className="fas fa-user" /> Profile
        </Link>
      </li>
      <li>
        <p onClick={logout} href="#!">
          <Link to="/" onClick={click}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </p>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className="navbar-ul">
      <li>
        <Link to="/admin" onClick={click}>
          Admin
        </Link>
      </li>
      <li>
        <Link to="/tutorials" onClick={click}>
          Tutorials
        </Link>
      </li>
      <li>
        <Link to="/posts" onClick={click}>
          Posts
        </Link>
      </li>
      <li>
        <Link to="/profiles" onClick={click}>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/dashboard" onClick={click}>
          <i className="fas fa-user" /> Profile
        </Link>
      </li>
      <li>
        <p onClick={logout} href="#!">
          <Link to="/" onClick={click}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </p>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-ul">
      <li>
        <Link to="/profiles" onClick={click}>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register" onClick={click}>
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={click}>
          Login
        </Link>
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

  let drawerClasses = 'side-drawer';
  if (show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <div className="side-drawer-container">
      <div></div>
      <nav className={drawerClasses}>
        {isAuthenticated ? (
          <div className="logo-navbar logged-in-navbar-mobile">
            <Link to="/dashboard" onClick={click}>
              <i className="fas fa-code"></i> ePOINT
            </Link>
            {isAuthenticated ? greeting() : null}
          </div>
        ) : (
          <Link className="logo-navbar" to="/" onClick={click}>
            <i className="fas fa-code"></i> ePOINT
          </Link>
        )}
        {!loading && <Fragment>{isAuthenticated ? navSwitch() : guestLinks}</Fragment>}
      </nav>
      <div></div>
    </div>
  );
};

SideDrawer.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(SideDrawer);
