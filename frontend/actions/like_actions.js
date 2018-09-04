import * as LikeApiUtil from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKE";

export const receiveLike = (payload) => {
  return {
    type: RECEIVE_LIKE,
    payload
  };
};

export const makeLike = (trackId) => {
  return (dispatch) => {
    return LikeApiUtil.makeLike(trackId).then(
      (payload) => dispatch(receiveLike(payload))
    );
  };
};

export const deleteLike = (trackId) => {
  return (dispatch) => {
    return LikeApiUtil.deleteLike(trackId).then(
      (payload) => dispatch(receiveLike(payload))
    );
  };
};
