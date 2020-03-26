import {
    ADD_TUTORIAL,
    ADD_VIDEO,
    DELETE_VIDEO,
    TUTORIAL_ERROR,
    GET_TUTORIAL,
    GET_TUTORIALS
} from '../actions/types';

const initialState = {
    tutorials: [],
    tutorial: null,
    videos: [],
    loading: true,
    test: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TUTORIALS:
            return {
                ...state,
                tutorials: payload,
                tutorialsPay: console.log('GET_TUTORIALS', payload),
                tutorial: null,
                loading: false
            };
        case ADD_TUTORIAL:
            return {
                ...state,
                tutorials: state.tutorials.push(payload),
                loading: false,
                testingAdd: console.log('ADD_TUTORIAL', payload)
            };
        case GET_TUTORIAL:
            return {
                ...state,
                tutorialTest: console.log('tutorial Test', state),
                tutorial: payload,
                loading: false
            };
        case ADD_VIDEO:
            return {
                ...state,
                tutorial: payload.video,
                videoTest: console.log('PAYLOAD', payload.video),
                stateTest: console.log('STATE', state),
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
