import { createSelector } from "reselect";

const selectPost = state => state.post;

export const selectPostPost = createSelector(
  [selectPost],
  post => post.post
);

export const selectPosts = createSelector(
  [selectPost],
  post => post.posts
);

export const selectLoading = createSelector(
  [selectPost],
  post => post.loading
);
