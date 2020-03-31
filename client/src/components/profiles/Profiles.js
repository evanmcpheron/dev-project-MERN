import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <Fragment>
            <section className="container profiles-wrapper">
                {loading ? (
                    <Spinner />
                ) : (
                    <Fragment>
                        <h2>Developers</h2>
                        <p>Browse and connect with developers</p>
                        <div>
                            {profiles.length > 0 ? (
                                profiles.map(profile => (
                                    <ProfileItem
                                        key={profile._id}
                                        profile={profile}
                                    />
                                ))
                            ) : (
                                <h4>No profiles found...</h4>
                            )}
                        </div>
                    </Fragment>
                )}
            </section>
        </Fragment>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
