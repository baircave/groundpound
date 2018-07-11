import React from 'react';
import { connect } from 'react-redux';

const NavBar = ({ user }) => {
  return (
    <div className="navbar">
      <img src="https://i.kym-cdn.com/entries/icons/original/000/016/057/soundcloud-reverse.png"
           width="69"
           height="46" />
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id]
  };
};

export default connect(mapStateToProps)(NavBar);
