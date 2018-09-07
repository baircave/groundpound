import React from 'react';
import { connect } from 'react-redux';
import { makeFollow, deleteFollow } from '../../actions/follow_actions';
import { openModal } from '../../actions/modal_actions';

const classMap = {
  true: "followed-button",
  false: "unfollowed-button"
};

const textMap = {
  true: "Following",
  false: "Follow"
};

class FollowButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      followed: false
    };
  }

  componentDidMount() {
    this.colorizeButton();
  }

  componentDidUpdate() {
    this.colorizeButton();
  }

  colorizeButton() {
    const currUser = this.props.currUser;

    if (currUser) {
      const isFollowed = currUser.followed_ids.includes(this.props.artistId);

      if (isFollowed !== this.state.followed) {
        this.setState({followed: isFollowed});
      }
    }
  }

  handleFollow() {
    if (!this.props.currUser) {
      this.props.openModal("login");
    } else {
      if (this.state.followed) {
        this.props.deleteFollow(this.props.artistId);
        this.setState({followed: false});
      } else {
        this.props.makeFollow(this.props.artistId);
        this.setState({followed: true});
      }
    }
  }

  render() {
    const currUser = this.props.currUser;
    if (currUser && currUser.id == this.props.artistId) return null;

    return (
      <button className={classMap[this.state.followed]}
        onClick={this.handleFollow.bind(this)}>
        {textMap[this.state.followed]}
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeFollow: (artistId) => dispatch(makeFollow(artistId)),
    deleteFollow: (artistId) => dispatch(deleteFollow(artistId)),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
