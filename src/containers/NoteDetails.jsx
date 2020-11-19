import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FormGroup, FormControl } from "react-bootstrap";
import { connect } from 'react-redux';

import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import * as noteActionTypes from "../store/notes/actions"
import "./NoteDetails.css";

function NoteDetails(props) {
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const note = props.notes.find(note => note.noteId === +id);
    if (!note) return;

    setNote(note);
    setContent(note.content);
  }, []);

  function validateForm() {
    return content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      props.onEditNote(note.noteId, { content });
      history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="Notes">
      {note && (
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
            Save
          </LoaderButton>
        </form>
      )}
    </div>
  );
}

const mapStateToStore = state => {
  return {
    notes: state.notes.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditNote: (noteId, changes) => dispatch({ type: noteActionTypes.EDIT_NOTE, payload: { noteId, changes } })
  }
};

export default connect(mapStateToStore, mapDispatchToProps)(NoteDetails);
