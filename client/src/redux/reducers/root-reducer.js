import { combineReducers } from 'redux';

import authReducer from './auth';
import alertReducer from './alert';
import profileReducer from './profile';
import postReducer from './post';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
  post: postReducer
});

export default rootReducer;
