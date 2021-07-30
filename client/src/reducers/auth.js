import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  // when token will be assigned then isAuthnticated variable will be True
  isAuthenticated: null,
  // after data will be recived from API request it will be changed to False
  loading: true,
  // then User will be assign
  user: null
};
