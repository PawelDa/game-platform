import axios form 'axios'
import { setAlert } from "./alert";
import {
  GET_TABLES,
  TABLE_ERROR
} from './types';

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
