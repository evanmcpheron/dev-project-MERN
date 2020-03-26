import axios from 'axios';
import { setAlert } from './alert';
import {
    ADD_TUTORIAL,
    ADD_VIDEO,
    DELETE_VIDEO,
    GET_ADMIN_VIDEOS,
    TUTORIAL_ERROR,
    GET_TUTORIAL,
    GET_TUTORIALS
} from './types';

// Add Tutorial
export const addTutorial = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/tutorial`, formData, config);

        dispatch({
            type: ADD_TUTORIAL,
            payload: res.data
        });

        dispatch(setAlert('Tutorial Created', 'success'));
    } catch (err) {
        dispatch({
            type: TUTORIAL_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get all tutorials
export const getTutorials = () => async dispatch => {
    try {
        const res = await axios.get('/api/tutorial');

        dispatch({
            type: GET_TUTORIALS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TUTORIAL_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get single tutorial
export const getTutorial = id => async dispatch => {
    try {
        const res = await axios.get(`/api/tutorial/${id}`);

        dispatch({
            type: GET_TUTORIAL,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TUTORIAL_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add Video to Tutorial
export const addVideo = (formData, tutorialId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(
            `/api/tutorial/video/${tutorialId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_VIDEO,
            payload: res.data
        });

        dispatch(setAlert('Video Added', 'success'));
    } catch (err) {
        dispatch({
            type: TUTORIAL_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
