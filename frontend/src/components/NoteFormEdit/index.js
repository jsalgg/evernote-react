// frontend/src/components/NotebookForm/index
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateNote } from "../../store/note";
function NotebookForm() {
  const dispatch = useDispatch();
  const { notebook_id, note_id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => state.notebooks);
  const notes = useSelector((state) => state.notes);
  const OGtitle = notes[note_id].title;
  const OGbody = notes[note_id].body;
  const [title, setTitle] = useState(OGtitle);
  const [body, setBody] = useState(OGbody);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  if (!sessionUser) {
    window.alert("Please log in first");
    history.push("/login");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      setErrors([]);
      const note = { id: note_id, title, body };
      return dispatch(updateNote(note)).then(() => {
        history.push(`/notebook/${notebook_id}`);
      });
    } else {
      return setErrors(["Please fill in both fields"]);
    }
  };

  return (
    <div className="container-note">
      <h2>Edit Your Note</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <p> Edit note for {notebooks[notebook_id].name}</p>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Body
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
}

export default NotebookForm;
