import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';

import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { getLoginError } from "../store/"
import { login } from "../store/auth/actions"
import { loadNotes } from '../store/notes/actions'

import "./Login.css";

function Login(props) {
  // const [validated, setValidated] = useState(false);
  const [fields, handleFieldChange, setFormFieldValue] = useFormFields({
    email: "user1",
    password: "qwerty123"
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function signIn() {
    props.onLoadNotes();
    props.onAuthenticateUser(fields.email, fields.password);
    setFormFieldValue('password', '');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await signIn();
    } catch (e) {
      onError(e);
    }
  }

  function renderLoginError() {
    return props.loginError ? (<div className="Error">Invalid credentials. Please try again...</div>) : null;
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            required
            value={fields.email}
            onChange={handleFieldChange}
            placeholder="user1"
          />
          {/* <FormControlFeedback type="invalid">
            Please enter your user id
          </FormControlFeedback> */}
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            required
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
            placeholder="qwerty123"
          />
          {/* <FormControlFeedback type="invalid">
            Please enter your password
          </FormControlFeedback> */}
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
      {renderLoginError()}
    </div>
  );
}

const mapStateToStore = state => {
  return {
    loginError: getLoginError(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticateUser: (user, password) => dispatch(login(user, password)),
    onLoadNotes: () => dispatch(loadNotes())
  }
};

export default connect(mapStateToStore, mapDispatchToProps)(Login);
