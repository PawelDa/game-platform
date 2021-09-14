import { createSelector } from "reselect";

export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  auth => auth.isAuthenticated
);
