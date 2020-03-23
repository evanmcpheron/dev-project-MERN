import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentItem from '../tutorial/CommentItem';

const TutorialItem = ({ tutorial: { _id, title } }) => {
    return (
        <div className="post bg-white p-1 my-1">
            <h1>{title}</h1>

            <Link to={`/tutorial/${_id}`} className="btn btn-primary">
                Watch Videos
            </Link>
        </div>
    );
};

TutorialItem.defaultProps = {
    showActions: true
};

TutorialItem.propTypes = {
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(TutorialItem);
