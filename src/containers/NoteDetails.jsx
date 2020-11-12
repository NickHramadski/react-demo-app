import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { DEFAULT_NOTES } from "../libs/constLib";
import "./NoteDetails.css";

export default function NoteDetails() {
  // TODO: Get data from REDUX here
  const storedNotes = DEFAULT_NOTES;
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadNote() {
      const result = storedNotes.find(note => note.noteId === id)
      return Promise.resolve(result);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content } = note;

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id, storedNotes]);

  function validateForm() {
    return content.length > 0;
  }

  function saveNote(data) {
    alert(`TODO: Update note #${id} '${data.content}' data to the REDUX store`);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      saveNote({ content });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
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
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
        </form>
      )}
    </div>
  );
}
