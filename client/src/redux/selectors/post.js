import { createSelector } from "reselect";

const selectState = state => state;

export const selectPost = createSelector(
  [selectState],
  state => state.post
);

export const selectPosts = createSelector(
  [selectPost],
  post => post.posts
);

export const selectLoading = createSelector(
  [selectPost],
  post => post.loading
);
