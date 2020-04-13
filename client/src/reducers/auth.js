import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  ADD_FOLLOWER,
  UNFOLLOW_USER,
  REMOVE_FOLLOWER,
  ADD_FOLLOWING,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  isAdmin: false,
  following: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FOLLOWING:
    case REMOVE_FOLLOWER:
      return {
        ...state,
        user: {
          ...state.user,
          following: payload.len,
          test: console.log(payload.len),
        },
      };

    case USER_LOADED:
      if (payload.email === 'evan.mcpheron@icloud.com') {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
          isAdmin: true,
        };
      } else {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
          isAdmin: false,
        };
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
