import React from 'react';
import { connect } from 'react-redux';
import TrackIndexItem from './track_index_item';
import { fetchTracks } from '../../actions/track_actions';
import { selectUserTracks } from '../../reducers/selectors';
import { withRouter } from 'react-router-dom';

class TrackIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    if (this.props.match.path === "/" || this.props.match.path === "/stream") {
      this.props.fetchTracks();
    }
  }

  render() {
    const IndexItemComponent = this.props.indexItemComponent;
    if (this.props.tracks.length === 0) {
      return null;
    }
    return (
      <div className="track-index">
        { this.props.match.path === "/" ?
          <h1>Hear what’s trending for free in the Groundpound community</h1> :
          null
        }
        <ul className={this.props.listType}>
          {this.props.tracks.map((track) => {
            return (
              <IndexItemComponent key={track.id}
                user={this.props.users[track.artist_id]}
                track={track}>
              </IndexItemComponent>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let tracks = [];
  if (ownProps.userProf) {
    if (ownProps.trackIds) {
      tracks = selectUserTracks(state, ownProps.trackIds);
    }
  } else {
    tracks = Object.values(state.entities.tracks)
  }

  return {
    tracks,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: () => dispatch(fetchTracks())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackIndex));
