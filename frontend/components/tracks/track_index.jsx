import React from 'react';
import { connect } from 'react-redux';
import TrackIndexItem from './track_index_item';
import { fetchTracks } from '../../actions/track_actions';

class TrackIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    if (this.props.tracks.length === 0) {
      return null;
    }
    return (
      <div className="track-index">
        <h1>Hear what’s trending for free in the Groundpound community</h1>
        <ul>
          {this.props.tracks.map((track) => {
            return (
              <TrackIndexItem key={track.id}
                user={this.props.users[track.artist_id]}
                track={track}>
              </TrackIndexItem>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tracks: Object.values(state.entities.tracks) || [],
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: () => dispatch(fetchTracks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndex);
