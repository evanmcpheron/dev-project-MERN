import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTutorial } from '../../actions/tutorial';

const Videos = ({ getTutorial, tutorial: { tutorial, loading }, match }) => {
    useEffect(() => {
        getTutorial(match.params.id);
    }, [getTutorial]);

    console.log(tutorial, 'Tutorial.js');

    return (
        <div>
            <div>Testing</div>
            <div>Testing</div>
            <div>Testing</div>
            <div>Testing</div>
            <div>Testing</div>
            <div>Testing</div>
            <div>Testing</div>
            <div>Testing</div>
        </div>
    );
};

Videos.propTypes = {
    getTutorial: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tutorial: state.tutorial
});

export default connect(mapStateToProps, { getTutorial })(Videos);
