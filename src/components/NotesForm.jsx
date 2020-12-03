import React, { useEffect, useState } from "react";
import { FormGroup, FormControl } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import "./NotesForm.css";

function NotesForm(props) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!props.entity) return;
    setContent(props.entity.content);
  }, [props]);

  function validateForm() {
    return content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit({ content });
  }

  return (
    <div className="Notes">
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
    </div>
  );
}

export default NotesForm;
