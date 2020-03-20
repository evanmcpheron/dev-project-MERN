import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import moment from 'moment';

const Navbar = ({
    auth: { isAuthenticated, loading, isAdmin, user },
    logout
}) => {
    const getGreetingTime = time => {
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

    const humanizedGreeting = userName => {
        return `Good ${getGreetingTime(moment())} ${userName}`;
    };

    const greeting = () => {
        if (user !== null && !loading) {
            return <p>{humanizedGreeting(user.fName)}</p>;
        }
    };

    const authLinks = (
        <ul>
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
                    <i className="fas fa-user" /> Dashboard
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
        <ul>
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
                    <i className="fas fa-user" /> Dashboard
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
        <ul>
            <li>
                <Link to="/tutorials">Tutorials</Link>
            </li>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
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

    return (
        <nav className="navbar bg-dark">
            <h1>
                {isAuthenticated ? (
                    <Link to="/dashboard">
                        <i className="fas fa-code"></i> ePOINT
                    </Link>
                ) : (
                    <Link to="/">
                        <i className="fas fa-code"></i> ePOINT
                    </Link>
                )}
            </h1>
            {!loading && (
                <Fragment>
                    {isAuthenticated ? greeting() : null}
                    {isAuthenticated ? navSwitch() : guestLinks}
                </Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
