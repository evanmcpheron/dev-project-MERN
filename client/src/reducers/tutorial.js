import { GET_TUTORIALS, GET_TUTORIAL, GET_VIDEOS } from '../actions/types';

const initialState = {
    tutorials: [],
    tutorial: null,
    video: [],
    cheezeWhiz: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TUTORIALS:
            return {
                ...state,
                tutorials: payload,
                loading: false
            };
        case GET_VIDEOS:
            return {
                ...state,
                video: payload,
                loading: false,
                cheezeWhiz: 'Testing Cheezy'
            };
        case GET_TUTORIAL:
            return {
                ...state,
                tutorial: payload,
                loading: false
            };
        default:
            return state;
    }
}
