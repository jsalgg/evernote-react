import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneNotebook } from "../../store/notebook";

function NotebookHome() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const notebooks = useSelector((state) => state.notebooks);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getOneNotebook(id))
      .then(() => {
        // window.alert("Notebook Accessed");
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
      <div className="nootebook-contianer">
        <h2>Your notebooks</h2>
        {
          //todo add notebvooks}
        }
        <NavLink to="note/new">New Note</NavLink>
      </div>
    </>
  );
}
export default NotebookHome;
