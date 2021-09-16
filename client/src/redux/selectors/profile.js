import { createSelector } from "reselect";

const selectState = state => state

export const selectProfile = createSelector(
  [selectState],
  state => state.profile
);

export const selectRepos = createSelector(
  [selectProfile],
  profile => profile.repos
);
