import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

const Auth = (origProps) => {
  const { component: Component, path, loggedIn } = origProps;

  const ownProps = Object.assign({}, origProps);
  delete ownProps.component;
  delete ownProps.path;
  delete ownProps.loggedIn;

  return (
    <Route path={path} render={(props) => {
      return (
        !loggedIn ? (
          <Component {...props} {...ownProps} />
        ) : (
          <Redirect to="/" />
        )
      );
    }}/>
  );
};

const Protected = (origProps) => {
  const { component: Component, path, loggedIn, onRootPage } = origProps;

  const newPath = (onRootPage ? '/login' : '/');

  const ownProps = Object.assign({}, origProps);
  delete ownProps.component;
  delete ownProps.path;
  delete ownProps.loggedIn;

  return (
    <Route path={path} render={(props) => {
      return (
        loggedIn ? (
          <Component {...props} {...ownProps} />
        ) : (
          <Redirect to={newPath} />
        )
      );
    }}/>
  );
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
