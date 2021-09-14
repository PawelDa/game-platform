import axios from 'axios'
import { setAlert } from "./alert";
import {
  GET_TABLES,
  TABLE_ERROR,
  ADD_TABLE
} from './.types';

/*
export const setAlert = (msg, type) => {
  const id = uuidv4();

  return {
    type: SET_ALERT,
    payload: {id, msg, type}

};
*/
// Get tables
export const getTables = () => async dispatch => {
  try {
    const res = await axios.get('api/tables');

    dispatch({
      type: GET_TABLES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TABLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create table
export const addTable = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log('Hello');
  try {
    const res = await axios.post('/api/tables', formData, config);
    console.log(res)
    dispatch({
      type: ADD_TABLE,
      payload: res.data
    });

    dispatch(setAlert('Table created', 'success'));
  } catch (err) {
    dispatch({
      type: TABLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
