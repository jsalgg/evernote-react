import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./notebookRender.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebook } from "../../store/notebook";
function NotebookRender() {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [notebooks, setNotebooks] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    window.alert("Please log in first");
    history.push("/login");
  }
  useEffect(() => {
    dispatch(getAllNotebook());
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
          <ul>{console.log(notebooks)}</ul>
        </div>
      </div>
    </>
  );
}
export default NotebookRender;
