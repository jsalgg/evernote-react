import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./notebookRender.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebook, deleteNotebook } from "../../store/notebook";

function NotebookRender() {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => state.notebooks);
  let [reload, setReload] = useState(0);
  if (!sessionUser) {
    window.alert("Please log in first");
    history.push("/login");
  }
  const deleteButton = (id) => {
    dispatch(deleteNotebook(id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    setReload(reload + 1);
  };

  useEffect(() => {
    dispatch(getAllNotebook()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <h2>Here are your notebooks</h2>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="notebook-container">
          {Object.values(notebooks)?.map((notebook) => {
            return (
              <div key={`a` + notebook.name} className="notebook-inner">
                <div className="notebook-inner--title">
                  <NavLink
                    style={{ background: notebook.color }}
                    key={`a` + notebook.id}
                    className="a-notebook"
                    to={`/notebook/${notebook.id}`}
                  >
                    {notebook.name}
                  </NavLink>
                </div>
                <div className="notebook-inner--btns" key={notebook.name + "v"}>
                  <a
                    style={{ background: notebook.color }}
                    key={`b` + notebook.id}
                    onClick={() => deleteButton(notebook.id)}
                  >
                    Delete
                  </a>
                  <NavLink
                    style={{ background: notebook.color }}
                    key={`d` + notebook.id}
                    to={`/notebook/${notebook.id}/edit`}
                  >
                    Edit
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default NotebookRender;
