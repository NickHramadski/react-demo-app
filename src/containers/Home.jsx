import React from "react";
import { connect } from 'react-redux';

import NotesList from "../components/NotesList";

function Home (props) {
  return (
    <div className="Home">
      <div className="notes">
        <NotesList notes={props.notes}></NotesList>
      </div>
    </div>
  );
}

const mapStateToStore = state => {
  return {
    notes: state.notes.list
  };
};

export default connect(mapStateToStore)(Home);
