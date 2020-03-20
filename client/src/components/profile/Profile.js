import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
    getProfileById,
    match,
    profile: { profile, loading },
    auth
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/profiles">Back to Profiles</Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link to="/edit-profile">Edit Profile</Link>
                        )}
                    <div>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div>
                            <h2>Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map(experience => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No Experience Listed</h4>
                            )}
                        </div>
                        <div>
                            <h2>Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map(education => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No Education Listed</h4>
                            )}
                        </div>
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
