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
