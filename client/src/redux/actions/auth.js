import axios from 'axios';

import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
 } from './types';

// User Registration
export const register = (formData) => async dispatch => {
  try {
    const res = await axios.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
