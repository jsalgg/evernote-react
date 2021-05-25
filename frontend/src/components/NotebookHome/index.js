import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebook } from "../../store/notebook";
function NotebookHome() {
  const notebooks = useSelector((state) => state.notebooks);

  const { id } = useParams();
  return <h1>{notebooks[id]}</h1>;
}
export default NotebookHome;
