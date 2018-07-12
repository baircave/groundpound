import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const Auth = function({ component: Component, path, loggedIn, exact }) {
  function toRender(props) {
    if (loggedIn) {
      return <Redirect to="/stream" />;
    } else {
      return <Component {...props} />;
    }
  }
  return (
    <Route path={path} exact={exact} render={toRender} />
  );
};

const Protected = function({ component: Component, path, loggedIn, exact }) {
  function toRender(props) {
    if (!loggedIn) {
      return <Redirect to="/" />;
    } else {
      return <Component {...props} />;
    }
  }
  return (
    <Route path={path} exact={exact} render={toRender} />
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.id)
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
