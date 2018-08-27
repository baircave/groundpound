export const makeLike = (trackId) => {
  return $.ajax({
    method: "POST",
    url: 'api/likes',
    data: {
      track_id: trackId
    }
  });
};

export const deleteLike = (trackId) => {
  return $.ajax({
    method: "DELETE",
    url: 'api/likes',
    data: {
      track_id: trackId
    }
  });
};
