export const makeRepost = (trackId) => {
  return $.ajax({
    method: "POST",
    url: 'api/reposts',
    data: {
      track_id: trackId
    }
  });
};

export const deleteRepost = (trackId) => {
  return $.ajax({
    method: "DELETE",
    url: 'api/reposts',
    data: {
      track_id: trackId
    }
  });
};
