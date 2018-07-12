import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const goToUploadForm = (e) => {
  console.log("we here");
};

const NavBar = ({ user, logout }) => {
  return (
    <div className="navbar">
      <div className="navbarContent">
        <img src={window.sc_mini_logo}/>
        <input type="text" placeholder="Search"></input>
        <button className="navButton" onClick={goToUploadForm}>Upload</button>
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
