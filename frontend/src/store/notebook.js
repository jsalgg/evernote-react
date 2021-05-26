import { csrfFetch } from "./csrf";

const CREATE_NOTEBOOK = "notebook/new";
const DELETE_NOTEBOOK = "notebook/delete";
const READ_NOTEBOOK = "notebook/";
const UPDATE_NOTEBOOK = "notebook/edit";

const cNotebook = (notebook) => {
  return {
    type: CREATE_NOTEBOOK,
    payload: notebook,
  };
};
const rNotebook = (notebooks) => {
  return {
    type: READ_NOTEBOOK,
    payload: notebooks,
  };
};
const dNotebook = (notebook) => {
  return {
    type: DELETE_NOTEBOOK,
    payload: notebook,
  };
};

const uNotebook = (notebook) => {
  return {
    type: UPDATE_NOTEBOOK,
    payload: notebook,
  };
};

export const deleteNotebook = (notebook_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebook/${notebook_id}/delete`, {
    method: "POST",
    body: JSON.stringify({
      notebook_id,
    }),
  });
  const data = await response.json();
  dispatch(dNotebook(data));
  return response;
};

export const createNotebook = (notebook) => async (dispatch) => {
  const { user_id, name, color } = notebook;
  const response = await csrfFetch("/api/notebook/new", {
    method: "POST",
    body: JSON.stringify({
      user_id,
      name,
      color,
    }),
  });
  const data = await response.json();
  dispatch(cNotebook(data));
  return response;
};

export const getAllNotebook = () => async (dispatch) => {
  const response = await csrfFetch("/api/notebook");
  const data = await response.json();
  dispatch(rNotebook(data));
  return response;
};

export const getOneNotebook = (notebook_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebook/${notebook_id}`);
  const data = await response.json();
  dispatch(rNotebook(data));
  return response;
};
export const updateNotebook = (notebook) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebook/${notebook.id}/edit`, {
    method: "POST",
    body: JSON.stringify({
      name: notebook.name,
      color: notebook.color,
    }),
  });
  const data = await response.json();
  dispatch(uNotebook(data));
  return response;
};

const notebookReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTEBOOK:
      newState = Object.assign({}, state);
      newState.notebooks = action.payload;
      return newState;
    case DELETE_NOTEBOOK:
      newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;
    case READ_NOTEBOOK:
      newState = Object.assign({}, state);
      action.payload.forEach((notebook) => {
        newState[notebook.id] = notebook;
      });
      return newState;
    case UPDATE_NOTEBOOK:
      newState = Object.assign({}, state);
      newState.notebooks = action.payload;
      return newState;
    default:
      return state;
  }
};

export default notebookReducer;
