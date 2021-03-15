import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_STREAM, EDIT_STREAM, FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

/* ----- TO DO ----- for edit & delete stream we need to do a check on the server side also to verify 
    they're still trying to edit/delete their own stream & that a hacker hasn't simply passed in a different
    userUID or streamID to bypass anything & do his/her hack
*/