import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <div className="baseGrid" key={edu._id}>
      <p className=" flex">{edu.school}</p>
      <div className="danger-button1">
        <button
          className="danger-button"
          onClick={(e) => deleteEducation(edu._id)}
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
      <h3>Education</h3>
      <div className="topGrid">
        <div className="middleGrid">
          <hr />
        </div>
        <div>{educations}</div>
      </div>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
