import { SET_ALERT, REMOVE_ALERT } from './.types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = alert => {
  const id = uuidv4();

  return {
    type: SET_ALERT,
    payload: {...alert, id}
  }
};
