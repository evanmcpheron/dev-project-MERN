import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { fName, lName }
    }
}) => {
    return (
        <div style={{ textAlign: 'center' }} className="experience-profile">
            {bio && (
                <Fragment>
                    <h3>{fName}'s Bio</h3>
                    <p>{bio}</p>
                    <div></div>
                </Fragment>
            )}
            <h3>Skill Set</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {skills.map((skill, index) => (
                    <div key={index}>
                        <p style={{ margin: '0 1rem' }}>
                            <i
                                className="fas fa-check"
                                style={{ fontSize: '1.5rem' }}
                            ></i>
                            {'   '}
                            {skill}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;
