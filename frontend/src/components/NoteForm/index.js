// frontend/src/components/NotebookForm/index
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createNote } from "../../store/note";
import "./noteform.css";
function NotebookForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => state.notebooks);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  if (!sessionUser) {
    window.alert("Please log in first");
    history.push("/login");
  }
  const handleSubmit = () => {
    if (title && body) {
      setErrors([]);
      const note = { user_id: sessionUser.id, title, body, notebook_id: id };
      return dispatch(createNote(note))
        .then(() => {
          history.push(`/notebook/${id}`);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      return setErrors(["Please fill in both fields"]);
    }
  };

  return (
    <div className="container-note">
      <h2>Create a new Note</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <p> New note for {notebooks[id].name}</p>
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
        <a
          onClick={() => {
            handleSubmit();
          }}
        >
          Create Note
        </a>
      </form>
    </div>
  );
}

export default NotebookForm;
