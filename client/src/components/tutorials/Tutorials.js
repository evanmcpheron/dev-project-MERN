import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTutorials } from '../../actions/tutorial';
import Spinner from '../layout/Spinner';
import TutorialItem from './TutorialItem';

const Tutorials = ({ getTutorials, tutorial: { tutorials, loading } }) => {
    useEffect(() => {
        getTutorials();
        console.log(tutorials);
    }, [getTutorials]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <section className="container">
                <h1>Tutorials</h1>

                <div className="tutorial-video-wrapper">
                    {tutorials.map((tut) => (
                        <div style={{ color: 'red' }}>
                            {tut.video.length > 0 && (
                                <TutorialItem
                                    showActions={true}
                                    key={tut._id}
                                    tutorial={tut}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </Fragment>
    );
};

Tutorials.propTypes = {
    getTutorials: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tutorial: state.tutorial,
});

export default connect(mapStateToProps, { getTutorials })(Tutorials);
