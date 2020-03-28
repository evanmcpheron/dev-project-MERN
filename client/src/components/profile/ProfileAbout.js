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
        <div>
            {bio && (
                <Fragment>
                    <h2>{fName}'s Bio</h2>
                    <p>{bio}</p>
                    <div></div>
                </Fragment>
            )}
            <h2>Skill Set</h2>
            <div>
                {skills.map((skill, index) => (
                    <div key={index}>
                        <i className="fas fa-check"></i> {skill}
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
