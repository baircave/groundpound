import React from 'react';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/session_actions';
import { NavLink } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';


const Navbar = ({ user, login, logout, loggedIn, visible, openModal }) => {
  if (!visible) {
    return null;
  }

  let navbar;

  if (loggedIn) {
    navbar = (
      <div className="navbar">
        <div className="navbarContent">
          <img src={window.gp_logo}/>
          <input type="text" placeholder="Search"></input>
          <NavLink className="navButton" to="/upload">Upload</NavLink>
          <button className="navButton">{user.username}</button>
          <button className="navButton" onClick={logout}>Sign Out</button>
        </div>
      </div>
    );
  } else {
    navbar = (
      <div className="navbar">
        <div className="navbarContent">
          <img src={window.gp_logo}/>
          <input type="text" placeholder="Search"></input>
          <button className="transButton session-navbar-button"
            onClick={() => openModal("login")}>Sign in</button>
          <button className="colorButton session-navbar-button"
            onClick={() => openModal("signup")}>Create account</button>
          <button className="transButton session-navbar-button"
            onClick={() => login({username: 'guest', password: 'asdfasdf'})}>Guest</button>
        </div>
      </div>
    );
  }

  return navbar;
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
