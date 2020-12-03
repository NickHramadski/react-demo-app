import React from "react";
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import NotesList from "../components/NotesList";
import { getFilteredNotes } from '../store/';
import { getSearchString } from '../store/';
import { loadNotes, searchNotes } from '../store/notes/actions';

function Home (props) {
  function searchStringChange(e) {
    props.onSearchNotes(e.target.value)
  }
  
  return (
    <div className="Home">
      <div className="notes-filter">
        <FormGroup controlId="searchString" bsSize="large">
          <ControlLabel>Search</ControlLabel>
          <FormControl
            autoFocus
            value={props.searchString}
            onChange={searchStringChange}
          />
        </FormGroup>
      </div>
      <div className="notes">
        <NotesList notes={props.notes}></NotesList>
      </div>
    </div>
  );
}

const mapStateToStore = state => {
  return {
    notes: getFilteredNotes(state),
    searchString: getSearchString(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadNotes: () => dispatch(loadNotes()),
    onSearchNotes: (searchString) => dispatch(searchNotes(searchString))
  }
};

export default connect(mapStateToStore, mapDispatchToProps)(Home);
