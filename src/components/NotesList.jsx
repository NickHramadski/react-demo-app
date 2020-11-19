import React from "react";
import { ListGroup } from "react-bootstrap";
import NotesListItem from "./NotesListItem";
import NotesListItemCreate from "./NotesListItemCreate";
import "./NotesList.css";

function NotesList(props) {
  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) => i !== 0
      ? <NotesListItem key={note.noteId} note={note}></NotesListItem>
      : <NotesListItemCreate key="new" ></NotesListItemCreate>
    );
  }

  return (
    <div className="Home">
      <ListGroup>
          {renderNotesList(props.notes)}
      </ListGroup>
    </div>
  );
}

export default NotesList;
