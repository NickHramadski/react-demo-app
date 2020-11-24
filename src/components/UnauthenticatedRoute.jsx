import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function UnauthenticatedRoute({ children, isAuthenticated, ...rest }) {
  const redirect = querystring("redirect");
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect ? redirect : "/"} />
      )}
    </Route>
  );
}

const mapStateToStore = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  };
};

export default connect(mapStateToStore)(UnauthenticatedRoute);
