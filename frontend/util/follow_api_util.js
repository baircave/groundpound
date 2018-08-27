export const makeFollow = (artistId) => {
  return $.ajax({
    method: "POST",
    url: 'api/follows',
    data: {
      artist_id: artistId
    }
  });
};

export const deleteFollow = (artistId) => {
  return $.ajax({
    method: "DELETE",
    url: 'api/follows',
    data: {
      artist_id: artistId
    }
  });
};
