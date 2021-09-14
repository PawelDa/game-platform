import { createSelector } from "reselect";

export const selectState = state => state;

export const selectAlerts = createSelector(
  [selectState],
  state => state.alert
);
