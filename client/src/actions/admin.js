import axios from 'axios';
import { setAlert } from './alert';
import { ADD_TUTORIAL, ADD_VIDEO, DELETE_VIDEO, TUTORIAL_ERROR } from './types';

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
