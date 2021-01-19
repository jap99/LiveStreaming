// ACTION CREATORS

import streams from '../apis/streams';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from './types';

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

export const createStream = formValues => async dispatch => {
    const res = await streams.post('/streams', formValues); // makes request to our api server to create a new stream
    // dispatch our action
    dispatch({ type: CREATE_STREAM, payload: res.data })
  };
// export const createStream = (formValues) => {
//   return async (dispatch) => {
//     streams.post('/streams', formValues);
//   };
// };