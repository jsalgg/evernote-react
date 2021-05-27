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
      <h1>
        {Object.values(notebooks).map((x) => {
          return x.name;
        })}
      </h1>
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
              <div key={`a` + notebook.name} className="notbook-inner">
                <NavLink
                  key={`a` + notebook.id}
                  className="a-notebook"
                  to={`/notebook/${notebook.id}`}
                >
                  <p
                    style={{ backgroundColor: notebook.color }}
                    className="notebook-li"
                    key={`c` + notebook.id}
                  >
                    {notebook.name}
                  </p>
                </NavLink>
                <button
                  key={`b` + notebook.id}
                  onClick={() => deleteButton(notebook.id)}
                >
                  Delete
                </button>
                <NavLink
                  key={`d` + notebook.id}
                  to={`/notebook/${notebook.id}/edit`}
                >
                  Edit
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default NotebookRender;
