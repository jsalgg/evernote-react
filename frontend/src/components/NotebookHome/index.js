import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneNotebook } from "../../store/notebook";
import { getAllNote, deleteNote } from "../../store/note";
import "./notebookHome.css";
function NotebookHome() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const notebooks = useSelector((state) => state.notebooks);
  const notes = useSelector((state) => state.notes);
  const { id } = useParams();
  const deleteButton = (id) => {
    dispatch(deleteNote(id));
  };
  useEffect(() => {
    dispatch(getOneNotebook(id)).then(() => {
      // window.alert("Notebook Accessed");
    });
    dispatch(getAllNote(id))
      .then(() => {
        // window.alert("Notes Accessed");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }, [dispatch, id]);
  return (
    <>
      <h1>{notebooks[id]?.name}</h1>
      <ul>
        {errors?.map((err) => {
          return <li key={err}>err</li>;
        })}
      </ul>
      <div className="notes-container">
        <h2>Your notes</h2>
        <ul>
          {Object.values(notes)?.map((note) => {
            return (
              <div key={note.id} className="the-note">
                <li key={note.id + "hi"}>
                  <NavLink key={note.id} to={`/notebook/${id}/note/${note.id}`}>
                    {note.title}
                  </NavLink>
                </li>
                <button
                  key={"jj" + note.id}
                  onClick={() => deleteButton(note.id)}
                >
                  Delete
                </button>
                <NavLink
                  key={"jj" + note.name}
                  to={`${id}/note/${note.id}/edit`}
                >
                  Edit
                </NavLink>
              </div>
            );
          })}
        </ul>
        <br />
      </div>
      <NavLink className="new-note-btn" to={`/notebook/${id}/note/new`}>
        New Note
      </NavLink>
    </>
  );
}
export default NotebookHome;
