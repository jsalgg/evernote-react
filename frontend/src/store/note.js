import { csrfFetch } from "./csrf";
const CREATE_NOTE = "notebook/new";
const DELETE_NOTE = "notebook/delete";
const READ_NOTE = "notebook/";

const cNote = (note) => {
  return {
    type: CREATE_NOTE,
    payload: note,
  };
};
const rNotebook = (notes) => {
  return {
    type: READ_NOTE,
    payload: notes,
  };
};

export const createNote = (note) => async (dispatch) => {
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

export const getOneNote = (note_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/note/${note_id}`);
  const data = await response.json();
  dispatch(rNotebook(data));
  return response;
};

const noteReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTE:
      newState = Object.assign({}, state);
      newState.notebooks = action.payload;
      return newState;
    case DELETE_NOTE:
      newState = Object.assign({}, state);
      newState.notebook = null;
      return newState;
    default:
      return state;
  }
};

export default noteReducer;
