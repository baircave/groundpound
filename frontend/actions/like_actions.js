import * as LikeApiUtil from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKE";

export const receiveLike = (likedIds) => {
  return {
    type: RECEIVE_LIKE,
    likedIds
  };
};

export const makeLike = (trackId) => {
  return (dispatch) => {
    return LikeApiUtil.makeLike(trackId).then(
      (likedIds) => dispatch(receiveLike(likedIds))
    );
  };
};

export const deleteLike = (trackId) => {
  return (dispatch) => {
    return LikeApiUtil.deleteLike(trackId).then(
      (likedIds) => dispatch(receiveLike(likedIds))
    );
  };
};
