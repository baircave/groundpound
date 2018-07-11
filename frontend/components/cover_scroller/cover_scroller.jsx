import React from 'react';
import LoginForm from '../session/login_container';
import SignupForm from '../session/signup_container';

export default class CoverScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: false
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.removeModal = this.removeModal.bind(this);
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
            <button onClick={this.handleLoginClick}>Sign in</button>
            <button onClick={this.handleSignupClick}>Create account</button>
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
