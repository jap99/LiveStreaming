// ACTION CREATORS

import streams from '../apis/streams';
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM, 
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from './types';

export const signIn = (userID) => {
  return {
    type: SIGN_IN,
    payload: userID
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
    const { userID } = getState().auth;
    const res = await streams.post('/streams', { ...formValues, userID });    
    // dispatch our action
    // Do some programmatic navigation to get  user back to root route (shows user the list of streams) 
    dispatch({ type: CREATE_STREAM, payload: res.data })
  };
// export const createStream = (formValues) => {
//   return async (dispatch) => {
//     streams.post('/streams', formValues);
//   };
// };

export const fetchStreams = () => async dispatch => {
  const res = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: res.data });
};

export const fetchStream = (id) => async dispatch => {
  const res = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: res.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const res = await streams.put(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: res.data });
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};

