export const postTrack = (formData) => {
  return $.ajax({
    method: "POST",
    url: 'api/tracks',
    data: formData,
    contentType: false,
    processData: false
  });
};

export const fetchTrack = (trackId) => {
  return $.ajax({
    method: "GET",
    url: `api/tracks/${trackId}`
  });
};

export const fetchTracks = () => {
  return $.ajax({
    method: "GET",
    url: `api/tracks`
  });
};

export const deleteTrack = (trackId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/tracks/${trackId}`
  });
};

export const incrementPlays = (trackId) => {
  return $.ajax({
    method: "PATCH",
    url: `api/tracks/${trackId}`,
    data: {
      track: {
        plays: 1
      }
    }
  });
};
