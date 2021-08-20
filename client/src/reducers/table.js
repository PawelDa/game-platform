import {
  GET_TABLES,
  TABLE_ERROR,
  ADD_TABLE
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
    case ADD_TABLE:
      return {
        ...state,
        tables: [...state.tables, payload],
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
