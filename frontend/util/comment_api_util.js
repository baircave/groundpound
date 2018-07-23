export const postComment = (trackId, comment) => {
  return $.ajax({
    method: "POST",
    url: `api/tracks/${trackId}/comments`,
    data: {
      comment
    }
  });
};

export const deleteComment = (commentId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/comments/${commentId}`
  });
};

// export const getComments = (trackId) => {
//   return $.ajax({
//     method: "GET",
//     url: 'api/comments',
//     data: {
//       track_id: trackId
//     }
//   });
// };
