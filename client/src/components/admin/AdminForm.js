import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { addTutorial, getTutorials } from '../../actions/admin';
import PropTypes from 'prop-types';

const AdminForm = ({
    setAlert,
    addTutorial,
    getTutorials,
    isAuthenticated
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnailURL: ''
    });

    const { title, description, thumbnailURL } = formData;

    const onChange = event =>
        setFormData({ ...formData, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();
        setFormData({
            title: '',
            description: '',
            thumbnailURL: ''
        });
        getTutorials();
        addTutorial({ title, description, thumbnailURL });
    };

    return (
        <Fragment>
            <h1>Create a new tutorial</h1>

            <form
                onSubmit={event => {
                    event.preventDefault();
                    setFormData({
                        title: '',
                        description: '',
                        thumbnailURL: ''
                    });
                    addTutorial({ title, description, thumbnailURL });
                }}
            >
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={event => onChange(event)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={event => onChange(event)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tutorial Thumbnail URL"
                        value={thumbnailURL}
                        onChange={event => onChange(event)}
                        name="thumbnailURL"
                        required
                    />
                </div>

                <input
                    className="btn btn-success admin-submit-btn"
                    type="submit"
                    value="Create Tutorial"
                    onClick={getTutorials}
                />
            </form>
        </Fragment>
    );
};

AdminForm.propTypes = {
    getTutorials: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    addTutorial: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    setAlert,
    addTutorial,
    getTutorials
})(AdminForm);
