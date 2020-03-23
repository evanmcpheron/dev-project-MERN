import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_TUTORIALS,
    TUTORIAL_ERROR,
    GET_TUTORIAL,
    GET_VIDEOS
} from './types';

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

// Get single tutorial's video
export const getVideos = id => async dispatch => {
    try {
        const res = await axios.get(`/api/tutorial/video/${id}`);

        dispatch({
            type: GET_VIDEOS,
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
