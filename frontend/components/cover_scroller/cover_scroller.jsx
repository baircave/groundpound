import React from 'react';
import { login, clearErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { removeNavbar, showNavbar } from '../../actions/navbar_actions';
import TrackIndex from '../tracks/track_index';

class CoverScroller extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.logInGuest = this.logInGuest.bind(this);
  }

  componentDidMount() {
    this.props.removeNavbar();
  }

  componentWillUnmount() {
    this.props.showNavbar();
  }

  logInGuest(e) {
    this.props.login({username: "guest", password:"asdfasdf"});
  }

  handleLoginClick(e) {
    this.props.openModal("login");
  }

  handleSignupClick(e) {
    this.props.openModal("signup");
  }

  render() {
    return (
      <section className="cover_scroller">
        <div className="cover_scroller_content">
          <img src={window.gp_logo_wordmark} width="120"></img>
          <div className="session_buttons">
            <button className="transButton" onClick={this.handleLoginClick}>Sign in</button>
            <button className="colorButton" onClick={this.handleSignupClick}>Create account</button>
            <button className="transButton" onClick={this.logInGuest}>Guest</button>
          </div>
        </div>
        <h1 className="landing-header">Welcome to Groundpound.</h1>
        <TrackIndex />

      </section>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    openModal: (modal) => dispatch(openModal(modal)),
    removeNavbar: () => dispatch(removeNavbar()),
    showNavbar: () => dispatch(showNavbar())
  };
};

export default connect(null, mapDispatchToProps)(CoverScroller);
