import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from 'react-redux';

function AuthenticatedRoute({ children, isAuthenticated, ...rest }) {
  const { pathname, search } = useLocation();
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}

const mapStateToStore = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  };
};

export default connect(mapStateToStore)(AuthenticatedRoute);
