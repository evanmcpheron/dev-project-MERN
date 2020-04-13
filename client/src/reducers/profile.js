import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  ADD_AVATAR,
  ADD_FOLLOWER, // add follower to array
  REMOVE_FOLLOWER, // remove follower from array
  UNFOLLOW_USER,
  ADD_FOLLOWING, // button to remove following
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FOLLOWER:
    case UNFOLLOW_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: {
            ...state.profile.user,
            followers: payload.len,
            test: console.log(payload.len),
          },
        },
      };
    case ADD_AVATAR:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: payload,
        },

        loading: false,
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
