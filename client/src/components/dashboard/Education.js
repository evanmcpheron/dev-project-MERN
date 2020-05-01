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
        <button className="btn btn-danger my2" onClick={() => deleteEducation(edu._id)}>
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <h2>Education</h2>
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
