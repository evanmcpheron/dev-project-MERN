import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <div className="baseGrid" key={exp._id}>
            <p className=" flex">{exp.company}</p>
            <p className="mobile flex">{exp.title}</p>
            <div className="tablet flex">
                <p>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                    {exp.to === null ? (
                        ' Current Employment'
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                </p>
            </div>
            <div className="danger-button1">
                <button
                    className="btn btn-danger my2"
                    onClick={() => deleteExperience(exp._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    ));

    return (
        <Fragment>
            <h2>Experience </h2>
            <div className="topGrid">
                <div className="middleGrid">
                    <div className="baseGrid">
                        <h4>Company</h4>
                        <h4 className="mobile">Title</h4>
                        <h4 className="tablet">Years</h4>
                    </div>
                    <hr />
                </div>
                <div>{experiences}</div>
            </div>
        </Fragment>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);

// import React, { Fragment } from 'react';
// import { connect } from 'react-redux';
// import Moment from 'react-moment';
// import PropTypes from 'prop-types';
// import { deleteExperience } from '../../actions/profile';

// const Experience = ({ experience, deleteExperience }) => {
//     const experiences = experience.map(exp => (
//         <div key={exp._id}>
//             <div>{exp.company}</div>
//             <div>{exp.title}</div>
//             <div>
//                 <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
//                 {exp.to === null ? (
//                     ' Now'
//                 ) : (
//                     <Moment format="YYYY/MM/DD">{exp.to}</Moment>
//                 )}
//             </div>
//             <div>
//                 <button onClick={() => deleteExperience(exp._id)}>
//                     Delete
//                 </button>
//             </div>
//         </div>
//     ));

//     return (
//         <Fragment>
//             <h2>Experience Credentials</h2>
//             <div>
//                 <div>
//                     <div>
//                         <h3>Company</h3>
//                         <h3>Title</h3>
//                         <h3>Years</h3>
//                     </div>
//                 </div>
//                 <tbody>{experiences}</tbody>
//             </table>
//         </Fragment>
//     );
// };

// Experience.propTypes = {
//     experience: PropTypes.array.isRequired,
//     deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(Experience);
