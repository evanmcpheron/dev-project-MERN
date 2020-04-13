import {
  ADD_TUTORIAL,
  ADD_VIDEO,
  DELETE_VIDEO,
  DELETE_TUTORIAL,
  TUTORIAL_ERROR,
  GET_TUTORIAL,
  GET_TUTORIALS,
  UPDATE_TUTORIAL,
} from '../actions/types';

const initialState = {
  tutorials: [],
  tutorial: null,
  videos: [],
  loading: true,
  test: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_TUTORIAL:
      return {
        ...state,
        tutorials: payload,
        loading: false,
      };
    case DELETE_VIDEO:
      return {
        ...state,
        tutorial: payload,
        loading: false,
      };
    case ADD_TUTORIAL:
      return {
        ...state,
        tutorials: [...state.tutorials, payload],
        loading: false,
      };
    case GET_TUTORIALS:
      return {
        ...state,
        tutorials: payload,
        tutorial: null,
        loading: false,
      };
    case GET_TUTORIAL:
      return {
        ...state,
        tutorial: payload,
        loading: false,
      };
    case DELETE_TUTORIAL:
      return {
        ...state,
        tutorials: payload,
        loading: false,
      };
    case ADD_VIDEO:
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
