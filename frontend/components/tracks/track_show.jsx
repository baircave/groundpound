import React from 'react';
import NavBar from '../main_page/navbar';
import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';

class TrackShow extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.makeGradient = this.makeGradient.bind(this);
    this.state = {

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
    this.props.fetchTrack(this.props.match.params.id);
  }


  render() {
    return (
      <div className="showPage">
        <NavBar></NavBar>
        <div className="gradientWrapper">
          <canvas className="canvas" ref={this.canvasRef} width="300" height="300"></canvas>
          <script type="text/javascript">

          </script>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId))
  };
};

export default connect(null, mapDispatchToProps)(TrackShow);
