import { createSelector } from "reselect";

export const selectAuth = state => state.auth

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  auth => auth.isAuthenticated
);

export const selectLoading = createSelector(
  [selectAuth],
  auth => auth.loading
);
