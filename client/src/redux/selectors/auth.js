import { createSelector } from "reselect";

const selectState = state => state

export const selectAuth = createSelector(
    [selectState],
    state => state.auth
  );
  
export const selectIsAuthenticated = createSelector(
  [selectAuth],
  auth => auth.isAuthenticated
);

export const selectLoading = createSelector(
  [selectAuth],
  auth => auth.loading
);
