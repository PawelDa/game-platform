import { createSelector } from "reselect";

const selectState = state => state

export const selectProfile = createSelector(
  [selectState],
  state => state.profile
);
