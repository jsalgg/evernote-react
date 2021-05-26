import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneNotebook } from "../../store/notebook";
import { getAllNote } from "../../store/note";
import "./notebookHome.css";
function NotebookHome() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const notebooks = useSelector((state) => state.notebooks);
  const notes = useSelector((state) => state.notes);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOneNotebook(id))
      .then(() => {
        // window.alert("Notebook Accessed");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
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
              <li key={note.id}>
                <NavLink key={note.id} to="">
                  {note.title}
                </NavLink>
              </li>
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
