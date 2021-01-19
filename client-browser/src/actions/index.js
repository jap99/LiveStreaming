// ACTION CREATORS

import streams from '../apis/streams';
import { SIGN_IN, SIGN_OUT } from './types';

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
    streams.post('/streams', formValues); // makes request to our api server to create a new stream
};
// export const createStream = (formValues) => {
//   return async (dispatch) => {
//     streams.post('/streams', formValues);
//   };
// };