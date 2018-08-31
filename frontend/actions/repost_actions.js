import * as RepostApiUtil from '../util/repost_api_util';

export const RECEIVE_REPOST = "RECEIVE_REPOST";

export const receiveRepost = (repostedIds) => {
  return {
    type: RECEIVE_REPOST,
    repostedIds
  };
};

export const makeRepost = (trackId) => {
  return (dispatch) => {
    return RepostApiUtil.makeRepost(trackId).then(
      (repostedIds) => dispatch(receiveRepost(repostedIds))
    );
  };
};

export const deleteRepost = (trackId) => {
  return (dispatch) => {
    return RepostApiUtil.deleteRepost(trackId).then(
      (repostedIds) => dispatch(receiveRepost(repostedIds))
    );
  };
};
