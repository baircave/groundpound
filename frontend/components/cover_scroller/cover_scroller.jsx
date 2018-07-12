import React from 'react';
import LoginForm from '../session/login_container';
import SignupForm from '../session/signup_container';
import { login, clearErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';

class CoverScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: false
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.logInGuest = this.logInGuest.bind(this);
    this.removeModal = this.removeModal.bind(this);
  }

  logInGuest(e) {
    this.props.login({username: "guest", password:"asdfasdf"});
  }

  handleLoginClick(e) {
    this.setState({
      showLogin: true,
      showSignup: false
    });
  }

  handleSignupClick(e) {
    this.setState({
      showLogin: false,
      showSignup: true
    });
  }

  removeModal(e) {
    e.preventDefault();
    this.props.clearErrors();
    this.setState({
      showLogin: false,
      showSignup: false
    });
  }

  render() {
    return (
      <section className="cover_scroller">
        <div className="cover_scroller_content">
          <h1>Welcome to Groundpound.</h1>
          <div className="session_buttons">
            <button className="transButton" onClick={this.handleLoginClick}>Sign in</button>
            <button className="colorButton" onClick={this.handleSignupClick}>Create account</button>
            <button className="transButton" onClick={this.logInGuest}>Guest</button>
          </div>
        </div>
        { (this.state.showLogin || this.state.showSignup) ?
          <div onClick={this.removeModal} className="session_form_wrapper">
            { (this.state.showLogin) ?
              < LoginForm /> :
              null
            }
            { (this.state.showSignup) ?
              < SignupForm /> :
              null
            }
            <a className="quit_modal">&times;</a>
          </div> :
          null
        }
      </section>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(null, mapDispatchToProps)(CoverScroller);
