import React from 'react';
import TrackIndex from '../tracks/track_index';
import TrackIndexItem from '../tracks/track_index_item';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';

class Likes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchComplete: false
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id).then(() => {
      this.setState({fetchComplete: true});
    });
  }

  render() {
    if (!this.state.fetchComplete) return null;

    return (
      <div className="main-page">
        <div className="track-index-wrapper">
          <div className="max-min-width">
            <div className="label-select-with-buttons">
              <div>
                <h2 className="index-label-selected">Likes</h2>
              </div>
            </div>
          </div>
          <div className="index-and-sidebar">
            <TrackIndex indexItemComponent={TrackIndexItem}
              listType="grid-list"
              trackIds={this.props.trackIds}></TrackIndex>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.id];
  let trackIds;
  if (user) trackIds = user.liked_ids;
  return {
    trackIds
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Likes));
