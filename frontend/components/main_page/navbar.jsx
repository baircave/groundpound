import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user, logout }) => {
  return (
    <div className="navbar">
      <div className="navbarContent">
        <img src={window.sc_mini_logo}/>
        <input type="text" placeholder="Search"></input>
        <NavLink className="navButton" to="/upload">Upload</NavLink>
        <button className="navButton">{user.username}</button>
        <button className="navButton" onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
