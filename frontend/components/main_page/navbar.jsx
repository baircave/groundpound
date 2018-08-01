import React from 'react';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/session_actions';
import { NavLink, withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';


const Navbar = ({ user, login, logout, loggedIn, visible, openModal, history }) => {
  if (!visible) {
    return null;
  }

  let navbar;

  if (loggedIn) {
    navbar = (
      <div className="navbar">
        <div className="navbar-content">
          <img onClick={ () => history.push('/') } src={window.gp_logo}/>
          <input type="text" placeholder="Search"></input>
          <NavLink className="nav-button" to="/upload">Upload</NavLink>
          <NavLink className="nav-button" to={`/users/${user.id}`}>{user.username}</NavLink>
          <button className="nav-button" onClick={logout}>Sign Out</button>
        </div>
      </div>
    );
  } else {
    navbar = (
      <div className="navbar">
        <div className="navbar-content">
          <img onClick={ () => history.push('/') } src={window.gp_logo}/>
          <input type="text" placeholder="Search"></input>
          <button className="trans-button session-navbar-button"
            onClick={() => openModal("login")}>Sign in</button>
          <button className="color-button session-navbar-button"
            onClick={() => openModal("signup")}>Create account</button>
          <button className="trans-button session-navbar-button"
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
