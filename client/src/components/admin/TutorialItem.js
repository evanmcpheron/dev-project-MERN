import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TutorialItem = ({ tutorial: { _id, title, description } }) => {
    return (
        <div className="post bg-white p-1 my-1">
            <h1>{title}</h1>
            <p>{description}</p>

            <Link to={`/admin/tutorial/${_id}`} className="btn btn-primary">
                Edit Videos
            </Link>
        </div>
    );
};

// TutorialItem.defaultProps = {
//     showActions: true
// };

TutorialItem.propTypes = {
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(TutorialItem);
