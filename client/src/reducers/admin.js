import {
    ADD_TUTORIAL,
    ADD_VIDEO,
    DELETE_VIDEO,
    TUTORIAL_ERROR
} from '../actions/types';

const initialState = {
    tutorials: [],
    videos: [],
    loading: true
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_TUTORIAL:
            return {
                ...state,
                tutorials: [payload, ...state.tutorials],
                loading: false
            };
        case ADD_VIDEO:
            return {
                ...state,
                videos: [payload, ...state.videos],
                loading: false
            };
        case TUTORIAL_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
