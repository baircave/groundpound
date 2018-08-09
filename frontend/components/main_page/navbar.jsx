import React from 'react';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/session_actions';
import { NavLink, withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { generateRGB, imageLoaded } from '../../util/helpers';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opacityClass: ""
    };
    this.gradientString = `linear-gradient(45deg, #43c3d3, ${generateRGB()})`;
  }

  redirectToProfile() {
    this.props.history.push(`/users/${this.props.user.id}`);
  }

  render() {
    const profImgClassNames = `opacity-fade navbar-prof-photo ${this.state.opacityClass}`;

    if (!this.props.visible) {
      return null;
    }

    let navbarButtons = (
      <div className="navbar-buttons">
        <button className="trans-button session-navbar-button"
          onClick={() => this.props.openModal("login")}>Sign in</button>
        <button className="color-button session-navbar-button"
          onClick={() => this.props.openModal("signup")}>Create account</button>
        <button className="trans-button session-navbar-button"
          onClick={() => this.props.login({username: 'guest', password: 'asdfasdf'})}>Guest</button>
      </div>
    );

    if (this.props.loggedIn) {
      navbarButtons = (
        <div className="navbar-buttons">
          <NavLink className="nav-button" to="/upload">Upload</NavLink>
          <div className="profile-menu-button nav-button"
            onClick={this.redirectToProfile.bind(this)}>
            <div className="navbar-prof-photo"
              style={ {background: this.gradientString}}>
              <img src={this.props.user.profile_photo}
                className={profImgClassNames}
                onLoad={imageLoaded.bind(this)}></img>
            </div>
            <button className="nav-button prof-button">{this.props.user.username}</button>
          </div>
          <button className="nav-button" onClick={this.props.logout}>Sign Out</button>
        </div>
      );
    }

    return (
      <div className="navbar">
        <div className="navbar-content">
          <img className="navbar-logo" onClick={ () => this.props.history.push('/') } src={window.gp_logo}/>
          <input type="text" placeholder="Search **NOT YET FUNCTIONAL"></input>
          {navbarButtons}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id],
    loggedIn: state.session.id,
    visible: state.ui.navbar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    logout: () => dispatch(logout()),
    login: (credentials) => dispatch(login(credentials))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
