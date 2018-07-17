import React from 'react';
import NavBar from '../main_page/navbar';
import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import { trackAgeFromMs } from '../../util/helpers';

class TrackShow extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.makeGradient = this.makeGradient.bind(this);
    this.state = {
      track: [{
        title: "",
        created_at: "",
        description: "",
        track_url: "",
        artwork_file: "",
        track_file: "",
        id: null,
        artist_id: null
      }],
      user: [{username: "", nickname: "", profile_url: "", id: null}]
    };
  }

  makeGradient() {

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    let grd;

    grd = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);

    grd.addColorStop(0.000, this.generateRGB());
    grd.addColorStop(1.000, this.generateRGB());

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 300.000, 300.000);
  }

  generateRGB() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    return `rgba(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)}, 1.000)`;
  }

  componentDidMount() {
    this.makeGradient();
    this.props.fetchTrack(this.props.match.params.id).then((response) => {
      this.setState({
        user: Object.values(response.payload.users),
        track: Object.values(response.payload.tracks)
      });
    });

  }

  render() {
    const track = this.state.track[0];
    const d1 = new Date(track.created_at);
    const d2 = new Date();
    const trackAge = trackAgeFromMs(d2 - d1);
    return (
      <div className="mainWrapper">
        <NavBar></NavBar>
        <div className="showPage">
          <div className="playbackWrapper">
            <div className="gradientWrapper">
              <canvas className="canvas" ref={this.canvasRef} width="300" height="300"></canvas>
            </div>
            <section className="playbackContents">
              <button className="playButton"><i className="fas fa-play"></i></button>
              <div className="nameAndTitle">
                <h3>{this.state.user[0].nickname}</h3>
                <h2>{track.title}</h2>
              </div>
              <img className="albumArt" src={track.artwork_file}></img>
              <h4 className="trackAge">{trackAge}</h4>
            </section>
          </div>
          <div className="comments">
          </div>

        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     track: state.entities.tracks[]
//   }
// };

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId))
  };
};

export default connect(null, mapDispatchToProps)(TrackShow);
