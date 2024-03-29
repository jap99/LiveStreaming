// ------- ACTION CREATORS ------- //
// ------- ACTION CREATORS ------- //
// ------- ACTION CREATORS ------- //
// ------- ACTION CREATORS ------- //
// ------- ACTION CREATORS ------- //

import streams from '../apis/streams';
import history from '../history';
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
    // Do some programmatic navigation to get user back to root route (shows user the list of streams) 
    dispatch({ type: CREATE_STREAM, payload: res.data })
    history.push('/');    // push is how we navigate a user around
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

// form values are the new values to update the stream with
export const editStream = (id, formValues) => async dispatch => {
  const res = await streams.patch(`/streams/${id}`, formValues);
  /* ---- TODO ---- the response we get is given to us here after the stream's deleted from the api server
      we then dispatch it so it can be updated in the redux store to reflect the deleted stream. We need to 
      verify that the deletion in the api server AND in the redux store were successful; otherwise, make them 
      both unsuccessful so that it appears as if nothing at all even occurred.
  */ 
  dispatch({ type: EDIT_STREAM, payload: res.data });
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  // ---- TODO --- have the api server confirm deletion was completed successfully & react accordingly ---- // 
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};

