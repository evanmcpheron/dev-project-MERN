import { ADD_TUTORIAL, ADD_VIDEO, DELETE_VIDEO } from '../actions/types';

const initialState = {
    tutorials: [],
    videos: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        default:
            return state;
    }
}
