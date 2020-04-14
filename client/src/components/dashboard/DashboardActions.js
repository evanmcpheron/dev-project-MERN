import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
  return (
    <div className="dashboard-btns">
      <Link to="/edit-profile" className="btn m2 dash-btn">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn m2 dash-btn">
        <i className="fab fa-black-tie"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn m2 dash-btn">
        <i className="fas fa-graduation-cap"></i> Add Education
      </Link>
    </div>
  );
};
