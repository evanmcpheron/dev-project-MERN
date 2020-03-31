import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TutorialItem = ({
    tutorial: { _id, title, description, thumbnailURL }
}) => {
    return (
        <div className="tutorials-container">
            <div>
                <img src={thumbnailURL} />
                <div className="tutorials-container-body">
                    <h5>{title}</h5>
                    <p>{description}</p>
                </div>
            </div>
            <div>
                <Link className="btn btn-success" to={`/tutorial/${_id}`}>
                    Watch Videos
                </Link>
                <div></div>
            </div>
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
