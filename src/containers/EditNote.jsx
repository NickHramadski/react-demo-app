import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import NotesForm from "../components/NotesForm";
import { onError } from "../libs/errorLib";
import { updateNote } from "../store/notes/actions"

function NoteDetails(props) {
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState("");

  useEffect(() => {
    const noteToEdit = props.notesMap.get(id);
    if (!noteToEdit) return;
    setNote(noteToEdit);
  }, [id, props]);

  async function handleSubmit(data) {
    try {
      props.onUpdateNote(id, data);
      history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  return (
    <NotesForm entity={note} onSubmit={data => handleSubmit(data)}></NotesForm>
  );
}

const mapStateToStore = state => {
  return {
    notesMap: state.notes.map
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateNote: (noteId, changes) => dispatch(updateNote(noteId, changes))
  }
};

export default connect(mapStateToStore, mapDispatchToProps)(NoteDetails);
