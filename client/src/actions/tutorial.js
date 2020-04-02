import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_TUTORIALS,
    TUTORIAL_ERROR,
    GET_TUTORIAL,
    GET_VIDEOS,
    ADD_VIDEO_COMMENT,
    DELETE_VIDEO_COMMENT
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

// ADD VIDEO COMMENT
export const addComment = (tutorialId, videoId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(
            `/api/tutorial/comment/${tutorialId}/${videoId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_VIDEO_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
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

// Delete comment
export const deleteComment = (
    tutorialId,
    videoId,
    commentId
) => async dispatch => {
    try {
        const res = await axios.delete(
            `/api/tutorial/comment/${tutorialId}/${videoId}/${commentId}`
        );

        dispatch({
            type: DELETE_VIDEO_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: TUTORIAL_ERROR,
            payload: {
                msg: err,
                status: err
            }
        });
    }
};
