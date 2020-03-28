import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TutorialItem = ({ tutorial: { _id, title } }) => {
    return (
        <div>
            <h1>{title}</h1>

            <Link to={`/tutorial/${_id}`}>Watch Videos</Link>
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
