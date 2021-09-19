import { createSelector } from "reselect";

export const selectProfile = state => state.profile

export const selectRepos = createSelector(
  [selectProfile],
  profile => profile.repos
);

export const selectProfileProfile = createSelector(
  [selectProfile],
  profile => profile.profile
);

export const selectLoading = createSelector(
  [selectProfile],
  profile => profile.loading
);

export const selectEducation = createSelector(
  [selectProfile],
  profile => profile.profile.education
);
