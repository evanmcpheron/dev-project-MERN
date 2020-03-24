import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { addVideo } from '../../actions/admin';
import PropTypes from 'prop-types';

const VideoForm = ({ setAlert, addVideo, isAuthenticated, videoId }) => {
    const [formData, setFormData] = useState({
        title: '',
        position: '',
        videoUrl: '',
        githubUrl: ''
    });

    const { title, position, videoUrl, githubUrl } = formData;

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        console.log(videoId);
    };

    const onSubmit = async event => {
        event.preventDefault();
        setFormData({
            title: '',
            position: '',
            videoUrl: '',
            githubUrl: ''
        });
        addVideo({ title, position, videoUrl, githubUrl }, videoId);
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
                        type="number"
                        placeholder="Video Position"
                        name="position"
                        value={position}
                        onChange={event => onChange(event)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Video URL"
                        value={videoUrl}
                        onChange={event => onChange(event)}
                        name="videoUrl"
                        required
                    />
                    <input
                        type="text"
                        placeholder="GitHub URL"
                        value={githubUrl}
                        onChange={event => onChange(event)}
                        name="githubUrl"
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

VideoForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addVideo: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, addVideo })(VideoForm);
