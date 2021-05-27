import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function NoteHome() {
  const { note_id } = useParams();
  const notes = useSelector((state) => state.notes);
  const OGtitle = notes[note_id].title;
  const OGbody = notes[note_id].body;
  const [title] = useState(OGtitle);
  const [body] = useState(OGbody);
  return (
    <>
      <h1>Note:</h1>
      <h2>{title}</h2>
      <p>{body}</p>
    </>
  );
}
export default NoteHome;
