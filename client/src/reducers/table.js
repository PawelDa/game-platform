import {
  GET_TABLES,
  TABLE_ERROR
} from '../actions/types';

const initialState = {
  tables: [],
  table: null,
  loading: true,
  error: {}
};

const tableReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TABLES:
      return {
        ...state,
        tables: payload,
        loading: false
      };
    case TABLE_ERROR:
      return {
        ...state,
        tables: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default tableReducer;
