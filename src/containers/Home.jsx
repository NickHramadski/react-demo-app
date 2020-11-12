import React from "react";
import "./Home.css";
import NotesList from "../components/NotesList";

export default function Home() {
  return (
    <div className="Home">
      <div className="notes">
        <NotesList></NotesList>
      </div>
    </div>
  );
}
