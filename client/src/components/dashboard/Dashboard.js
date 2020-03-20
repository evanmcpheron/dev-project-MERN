import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
    deleteAccount
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1>Dashboard</h1>
            <p>
                <i className="fas fa-user"></i>Welcome {user && user.fName}
            </p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div>
                        <button onClick={() => deleteAccount()}>
                            <i className="fas fa-user"></i> Delete My Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet set up a profile, please add some info
                    </p>
                    <Link to="/create-profile">Create Profile</Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
