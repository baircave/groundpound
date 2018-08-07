import React from 'react';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/session_actions';
import { NavLink, withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { generateRGB } from '../../util/helpers';

const gradientString = `linear-gradient(45deg, #43c3d3, ${generateRGB()})`;

const redirectToProfile = (userId, history) => {
  history.push(`/users/${userId}`);
};

const Navbar = ({ user, login, logout, loggedIn, visible, openModal, history }) => {
  if (!visible) {
    return null;
  }

  let profileImage = <div className="navbar-prof-photo"
    style={ {background: gradientString}}></div>;

  let navbarButtons = (
    <div className="navbar-buttons">
      <button className="trans-button session-navbar-button"
        onClick={() => openModal("login")}>Sign in</button>
      <button className="color-button session-navbar-button"
        onClick={() => openModal("signup")}>Create account</button>
      <button className="trans-button session-navbar-button"
        onClick={() => login({username: 'guest', password: 'asdfasdf'})}>Guest</button>
    </div>
  );

  if (loggedIn) {
    navbarButtons = (
      <div className="navbar-buttons">
        <NavLink className="nav-button" to="/upload">Upload</NavLink>
        <div className="profile-menu-button nav-button"
          onClick={() => redirectToProfile(user.id, history)}>
          {profileImage}
          <button className="nav-button prof-button">{user.username}</button>
        </div>
        <button className="nav-button" onClick={logout}>Sign Out</button>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar-content">
        <img onClick={ () => history.push('/') } src={window.gp_logo}/>
        <input type="text" placeholder="Search"></input>
        {navbarButtons}
      </div>
    </div>
  );
};

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
