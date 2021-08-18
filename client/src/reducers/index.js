import { combineReducers } from "redux";
import alert from './alert';
import auth from './auth';
import profile from './profile';
import table from './table';

export default combineReducers({
  alert,
  auth,
  profile,
  table
});
