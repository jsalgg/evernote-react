import { csrfFetch } from "./csrf";
const CREATE_NOTE = "note/new";
const DELETE_NOTE = "note/delete";
const READ_NOTE = "note/";

const cNote = (note) => {
  return {
    type: CREATE_NOTE,
    payload: note,
  };
};
const rNote = (notes) => {
  return {
    type: READ_NOTE,
    payload: notes,
  };
};

export const createNote = (note) => async (dispatch) => {
  const { user_id, title, body, notebook_id } = note;
  const response = await csrfFetch("/api/note/new", {
    method: "POST",
    body: JSON.stringify({
      user_id,
      title,
      body,
      notebook_id,
    }),
  });
  const data = await response.json();
  dispatch(cNote(data));
  return response;
};

export const getOneNote = (note_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/note/${note_id}`);
  const data = await response.json();
  dispatch(rNote(data));
  return response;
};

export const getAllNote = (notebook_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/note/${notebook_id}/get`);
  const data = await response.json();
  dispatch(rNote(data));
  return response;
};

const noteReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTE:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case DELETE_NOTE:
      newState = Object.assign({}, state);
      newState = null;
      return newState;
    case READ_NOTE:
      newState = Object.assign({}, state);
      action.payload.forEach((note) => {
        newState[note.id] = note;
      });
      return newState;
    default:
      return state;
  }
};

export default noteReducer;
