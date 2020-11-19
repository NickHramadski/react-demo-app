import React from "react";
import PropTypes from 'prop-types';
import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem } from "react-bootstrap";

export default function NotesListItem(props) {
  return (
    <LinkContainer to={`/notes/${props.note.noteId}`}>
      <ListGroupItem header={props.note.content.trim().split("\n")[0]}>
        {"Created: " + new Date(props.note.createdAt).toLocaleString()}
      </ListGroupItem>
    </LinkContainer>
  );
}

NotesListItem.propTypes = {
  note: PropTypes.shape({
    noteId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string
  })
};
