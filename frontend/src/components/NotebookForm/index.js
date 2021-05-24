// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import "./NoteForm.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as notebookActions from "../../store/notebook";
function NotebookForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const COLORS = ["red", "blue", "green", "orange", "yellow"];
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) {
    window.alert("Please log in first");
    return <Redirect to="/login" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && color) {
      setErrors([]);
      return dispatch(
        notebookActions.createNotebook({
          user_id: sessionUser.id,
          title,
          color,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(["Please fill in both fields"]);
  };

  return (
    <div className="container">
      <h2>Create a new Notebook</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        {sessionUser}
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
          Notebook Color
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          >
            {COLORS.map((color) => {
              return <option value={`${color}`}>{`${color}`}</option>;
            })}
          </select>
        </label>
        <button type="submit">Create Notebook</button>
      </form>
    </div>
  );
}

export default NotebookForm;
