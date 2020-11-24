import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';

import ErrorBoundary from "./components/ErrorBoundary";
import Routes from "./Routes";
import * as authActionTypes from "./store/auth/actions"
import "./App.css";

function App(props) {
  const history = useHistory();

  async function handleLogout() {
    props.onLogout();
    history.push("/login");
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React Demo App</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {props.isAuthenticated ? (
              <>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </div>
  );
}

const mapStateToStore = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({ type: authActionTypes.LOGOUT })
  }
};

export default connect(mapStateToStore, mapDispatchToProps)(App);
