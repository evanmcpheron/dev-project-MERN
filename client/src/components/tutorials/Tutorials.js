import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTutorials } from '../../actions/tutorial';
import Spinner from '../layout/Spinner';
import TutorialItem from './TutorialItem';

const Tutorials = ({ getTutorials, tutorial: { tutorials, loading } }) => {
    useEffect(() => {
        getTutorials();
    }, [getTutorials]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1>Posts</h1>
            <p>
                <i className="fas fa-user"></i> Welcome to the community
            </p>
            <div>
                {tutorials.map(tut => (
                    <TutorialItem
                        showActions={true}
                        key={tut._id}
                        tutorial={tut}
                    />
                ))}
            </div>
        </Fragment>
    );
};

Tutorials.propTypes = {
    getTutorials: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tutorial: state.tutorial
});

export default connect(mapStateToProps, { getTutorials })(Tutorials);
