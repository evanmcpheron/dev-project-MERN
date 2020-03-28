import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
    return (
        <div>
            <Link to="edit-profile">
                <i className="fas fa-user-circle"></i> Edit Profile
            </Link>
            <Link to="/add-experience">
                <i className="fab fa-black-tie"></i> Add Experience
            </Link>
            <Link to="/add-education">
                <i className="fas fa-graduation-cap"></i> Add Education
            </Link>
        </div>
    );
};
