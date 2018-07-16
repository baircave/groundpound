export const postTrack = (formData) => {
  return $.ajax({
    method: "POST",
    url: 'api/tracks',
    data: formData,
    contentType: false,
    processData: false
  });
};
