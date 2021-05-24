import { csrfFetch } from "./csrf";

const CREATE_NOTEBOOK = "notebook/new";
const DELETE_NOTEBOOK = "notebook/delete";

const setNotebook = (notebook) => {
  return {
    type: CREATE_NOTEBOOK,
    payload: notebook,
  };
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
  dispatch(setNotebook(data));
  return response;
};

const initialState = { notebook: null };

const notebookReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTEBOOK:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case DELETE_NOTEBOOK:
      newState = Object.assign({}, state);
      newState.notebook = null;
      return newState;
    default:
      return state;
  }
};

export default notebookReducer;
