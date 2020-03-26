import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { addTutorial, getTutorials } from '../../actions/admin';
import PropTypes from 'prop-types';

const AdminForm = ({
    setAlert,
    addTutorial,
    isAuthenticated,
    getTutorials
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnailURL: ''
    });

    const { title, description, thumbnailURL } = formData;

    const onChange = event =>
        setFormData({ ...formData, [event.target.name]: event.target.value });

    const onSubmit = async event => {
        event.preventDefault();
        setFormData({
            title: '',
            description: '',
            thumbnailURL: ''
        });
        addTutorial({ title, description, thumbnailURL });
        getTutorials();
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Create a new tutorial</h1>

            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
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
                    type="submit"
                    className="btn btn-primary"
                    value="Create Tutorial"
                />
            </form>
        </Fragment>
    );
};

AdminForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    getTutorials: PropTypes.func.isRequired,
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
