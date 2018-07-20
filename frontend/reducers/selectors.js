export const selectComments = (state, commentIds) => {
  return commentIds.map((id) => state.entities.comments[id]);
};

export const selectCommentAuthors = (state, comments) => {
  const users = {}
  comments.forEach(
    (comment) => users[comment.id] = state.entities.users[comment.author_id]
  );
  return users;
};
