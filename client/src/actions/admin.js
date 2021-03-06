import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TUTORIAL,
  ADD_VIDEO,
  DELETE_VIDEO,
  DELETE_TUTORIAL,
  GET_ADMIN_VIDEOS,
  TUTORIAL_ERROR,
  GET_TUTORIAL,
  GET_TUTORIALS,
  UPDATE_TUTORIAL,
} from './types';

// Add Tutorial
export const addTutorial = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/tutorial`, formData, config);

    dispatch({
      type: ADD_TUTORIAL,
      payload: res.data,
    });

    dispatch(setAlert('Tutorial Added', 'success'));
  } catch (err) {
    dispatch({
      type: TUTORIAL_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// DELETE specific video
export const deleteVideo = (id, vidId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/tutorial/videos/${id}/${vidId} `);

    dispatch({
      type: DELETE_VIDEO,
      payload: res.data,
    });

    dispatch(setAlert('Tutorial Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TUTORIAL_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all tutorials
export const getTutorials = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tutorial');

    dispatch({
      type: GET_TUTORIALS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TUTORIAL_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// DELETE SINGLE TUTORIAL
export const deleteTutorial = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This CANNOT be undone!')) {
    try {
      const res = await axios.delete(`/api/tutorial/${id} `);

      dispatch({
        type: DELETE_TUTORIAL,
        payload: res.data,
      });

      dispatch(setAlert('Tutorial Removed', 'success'));
    } catch (err) {
      dispatch({
        type: TUTORIAL_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// Get single tutorial
export const getTutorial = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/tutorial/${id}`);

    dispatch({
      type: GET_TUTORIAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TUTORIAL_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Video to Tutorial
export const addVideo = (formData, tutorialId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/tutorial/video/${tutorialId}`, formData, config);

    dispatch({
      type: ADD_VIDEO,
      payload: res.data,
    });

    dispatch(setAlert('Video Added', 'success'));
  } catch (err) {
    dispatch({
      type: TUTORIAL_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// UPDATE Tutorial Series
export const updateTutorial = (formData, tutorialId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/tutorial/update/${tutorialId}`, formData, config);

    dispatch({
      type: UPDATE_TUTORIAL,
      payload: res.data,
    });

    dispatch(setAlert('Tutorial Updated', 'success'));
  } catch (err) {
    dispatch({
      type: TUTORIAL_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
