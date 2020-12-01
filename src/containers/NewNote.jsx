import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import NotesForm from "../components/NotesForm";
import { onError } from "../libs/errorLib";
import { addNote } from "../store/notes/actions"

function NewNote(props) {
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      props.onAddNote(data);
      history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  return <NotesForm onSubmit={data => handleSubmit(data)}></NotesForm>;
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNote: (data) => dispatch(addNote(data))
  }
};

export default connect(null, mapDispatchToProps)(NewNote);
