import * as FollowApiUtil from '../util/follow_api_util';

export const RECEIVE_FOLLOWS = 'RECEIVE_FOLLOWS';

export const receiveFollows = (payload) => {
  return {
    type: RECEIVE_FOLLOWS,
    userId: payload.user_id,
    followedIds: payload.followed_ids
  };
};

export const makeFollow = (artistId) => {
  return (dispatch) => {
    return FollowApiUtil.makeFollow(artistId).then(
      (payload) => dispatch(receiveFollows(payload))
    );
  };
};

export const deleteFollow = (artistId) => {
  return (dispatch) => {
    return FollowApiUtil.deleteFollow(artistId).then(
      (payload) => dispatch(receiveFollows(payload))
    );
  };
};
