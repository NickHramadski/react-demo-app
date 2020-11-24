import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';

import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import * as authActionTypes from "../store/auth/actions"
import "./Login.css";

function Login(props) {
  const [fields, handleFieldChange, setFormFieldValue] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function signIn() {
    if ((fields.email === 'admin@admin.com') && (fields.password === '111')) return;
    setFormFieldValue('password', '');
    throw new Error('Invalid login! Try admin@admin.com with password: 111');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await signIn();
      props.onAuthenticateUser(fields.email);
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
            placeholder="admin@admin.com"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
            placeholder="111"
          />
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
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticateUser: (email) => dispatch({ type: authActionTypes.LOGIN, payload: email })
  }
};

export default connect(null, mapDispatchToProps)(Login);
