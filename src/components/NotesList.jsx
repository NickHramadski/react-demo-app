import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { DEFAULT_NOTES } from "../libs/constLib";
import { onError } from "../libs/errorLib";
import NotesListItem from "./NotesListItem";
import NotesListItemCreate from "./NotesListItemCreate";
import "./NotesList.css";

export default function NotesList() {
  // TODO: Get data from REDUX here
  const storedNotes = DEFAULT_NOTES;
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function loadNotes() {
      return Promise.resolve(storedNotes);
    }

    async function onLoad() {
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [storedNotes]);

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) => i !== 0
      ? <NotesListItem key={note.noteId} note={note}></NotesListItem>
      : <NotesListItemCreate key="new" ></NotesListItemCreate>
    );
  }

  return (
    <div className="Home">
      <ListGroup>
          {!isLoading && renderNotesList(notes)}
      </ListGroup>
    </div>
  );
}
