import {
  GET_TUTORIALS,
  GET_TUTORIAL,
  GET_VIDEOS,
  TUTORIAL_ERROR,
  ADD_VIDEO_COMMENT,
  DELETE_VIDEO_COMMENT,
  UPDATE_VIDEO_COMMENT,
} from '../actions/types';

const initialState = {
  tutorials: [],
  tutorial: null,
  video: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TUTORIALS:
      return {
        ...state,
        tutorials: payload,
        tutorial: null,
        loading: false,
      };
    case GET_VIDEOS:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case GET_TUTORIAL:
      return {
        ...state,
        tutorial: payload,
        loading: false,
      };
    case UPDATE_VIDEO_COMMENT:
    case ADD_VIDEO_COMMENT:
      return {
        ...state,

        tutorial: payload,
        loading: false,
      };
    case DELETE_VIDEO_COMMENT:
      return {
        ...state,
        tutorial: payload,
        loading: false,
      };
    case TUTORIAL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
