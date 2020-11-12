import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem } from "react-bootstrap";

export default function NotesListItemCreate() {
  return (
    <LinkContainer to="/notes/new">
      <ListGroupItem>
        <h4>
          <b>{"\uFF0B"}</b> Create a new note
        </h4>
      </ListGroupItem>
    </LinkContainer>
  );
}
