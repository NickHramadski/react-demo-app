import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl } from "react-bootstrap";
import { connect } from 'react-redux';

import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import * as noteActionTypes from "../store/notes/actions"
import "./NewNote.css";

function NewNote(props) {
  const history = useHistory();
  const [content, setContent] = useState("");

  function validateForm() {
    return content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      props.onAddNote({ content });
      history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNote: (data) => dispatch({ type: noteActionTypes.ADD_NOTE, payload: data })
  }
};

export default connect(null, mapDispatchToProps)(NewNote);
