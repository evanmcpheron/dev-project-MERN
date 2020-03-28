import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import moment from 'moment';

const Navbar = ({
    auth: { isAuthenticated, loading, isAdmin, user },
    logout
}) => {
    const [count, setCount] = useState('closed');

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
            return <p className="greeting">{humanizedGreeting(user.fName)}</p>;
        }
    };

    const authLinks = (
        <ul>
            <li>
                <Link
                    to="/tutorials"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Tutorials
                </Link>
            </li>
            <li>
                <Link
                    to="/posts"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Posts
                </Link>
            </li>
            <li>
                <Link
                    to="/profiles"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Developers
                </Link>
            </li>
            <li>
                <Link
                    to="/dashboard"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    <i className="fas fa-user" /> Dashboard
                </Link>
            </li>
            <li
                onClick={() => setCount(count === 'closed' ? 'open' : 'closed')}
            >
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
                <Link
                    to="/admin"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Admin
                </Link>
            </li>
            <li>
                <Link
                    to="/tutorials"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Tutorials
                </Link>
            </li>
            <li>
                <Link
                    to="/posts"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Posts
                </Link>
            </li>
            <li>
                <Link
                    to="/profiles"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Developers
                </Link>
            </li>
            <li>
                <Link
                    to="/dashboard"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    <i className="fas fa-user" /> Dashboard
                </Link>
            </li>
            <li>
                <p onClick={logout} href="#!">
                    <Link
                        to="/"
                        onClick={() =>
                            setCount(count === 'closed' ? 'open' : 'closed')
                        }
                    >
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                </p>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link
                    to="/profiles"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Developers
                </Link>
            </li>
            <li>
                <Link
                    to="/register"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
                    Register
                </Link>
            </li>
            <li>
                <Link
                    to="/login"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                >
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

    return (
        <div>
            {count === 'open' ? (
                <div
                    className="overlay"
                    onClick={() =>
                        setCount(count === 'closed' ? 'open' : 'closed')
                    }
                ></div>
            ) : null}

            <i
                class={`fas fa-hamburger fa-hamburger-${count}`}
                onClick={() => setCount(count === 'closed' ? 'open' : 'closed')}
            ></i>
            <nav className={`navbar-wrapper ${count}`}>
                {isAuthenticated ? (
                    <Link className="logo-navbar" to="/dashboard">
                        <i
                            className="fas fa-code"
                            onClick={() =>
                                setCount(count === 'closed' ? 'open' : 'closed')
                            }
                        ></i>{' '}
                        ePOINT
                    </Link>
                ) : (
                    <Link className="logo-navbar" to="/">
                        <i
                            className="fas fa-code"
                            onClick={() =>
                                setCount(count === 'closed' ? 'open' : 'closed')
                            }
                        ></i>{' '}
                        ePOINT
                    </Link>
                )}
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
