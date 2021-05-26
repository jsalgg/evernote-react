// frontend/src/components/NotebookForm/index
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateNotebook } from "../../store/notebook";
function NotebookForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => state.notebooks);
  const OGname = notebooks[id].name;
  const OGcolor = notebooks[id].color;
  const COLORS = ["red", "blue", "green", "orange", "yellow"];
  const [title, setTitle] = useState(OGname);
  const [color, setColor] = useState(OGcolor);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  if (!sessionUser) {
    window.alert("Please log in first");
    history.push("/login");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && color) {
      setErrors([]);
      const notebook = {
        id: id,
        user_id: sessionUser.id,
        name: title,
        color: color,
      };
      return dispatch(updateNotebook(notebook))
        .then(() => {
          history.push("/notebook");
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
    <div className="container">
      <h2>Edit your Notebook</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
              return (
                <option key={color} value={`${color}`}>{`${color}`}</option>
              );
            })}
          </select>
        </label>
        <button type="submit">Update Notebook</button>
      </form>
    </div>
  );
}

export default NotebookForm;
