import {
    ADD_TUTORIAL,
    ADD_VIDEO,
    DELETE_VIDEO,
    DELETE_TUTORIAL,
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
        case ADD_TUTORIAL:
            return {
                ...state,
                tutorials: [...state.tutorials, payload],
                testTutorial: console.log(
                    'ADD TUTORIAL PAYLOAD REDUCER: ',
                    payload
                ),
                getTutorial: console.log(
                    'ADD TUTORIAL STATE REDUCER: ',
                    state.tutorials
                ),
                loading: false
            };
        case GET_TUTORIALS:
            return {
                ...state,
                tutorials: payload,
                testState: console.log(
                    'GET TUTORIALS PAYLOAD REDUCER: ',
                    payload
                ),
                testStateTwo: console.log(
                    'GET TUTORIALS STATE IN REDUCER: ',
                    state.tutorials
                ),
                tutorial: null,
                loading: false
            };
        case GET_TUTORIAL:
            return {
                ...state,
                tutorialTest: console.log('tutorial Test', state),
                tutorial: payload,
                loading: false
            };
        case DELETE_TUTORIAL:
            return {
                ...state,
                testPayload: console.log('PAYLOAD DELETE TUTORIAL: ', payload),
                tutorials: payload,
                loading: false
            };
        case ADD_VIDEO:
            return {
                ...state,
                tutorial: payload,
                videoTest: console.log('PAYLOAD', payload),
                stateTest: console.log('STATE', state.tutorial),
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
