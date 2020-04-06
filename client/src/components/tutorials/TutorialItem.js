import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TutorialItem = ({ tutorial: { _id, title, description, thumbnailURL } }) => {
   return (
      <div className="tutorials-container">
         <Link to={`/tutorial/${_id}`}>
            <div>
               <img src={thumbnailURL} />
            </div>
         </Link>
      </div>
   );
};

TutorialItem.defaultProps = {
   showActions: true,
};

TutorialItem.propTypes = {
   tutorial: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, {})(TutorialItem);
