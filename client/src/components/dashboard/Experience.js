import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <div className="baseGrid" key={exp._id}>
      <p className=" flex">{exp.company}</p>
      <div className="danger-button1">
        <button
          className="danger-button"
          onClick={(e) => deleteExperience(exp._id)}
          type="button"
          style={{ marginRight: '1rem' }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <h3>Experience </h3>
      <div className="topGrid">
        <div className="middleGrid">
          <hr />
        </div>
        <div>{experiences}</div>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
