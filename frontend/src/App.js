// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NotebookForm from "./components/NotebookForm";
import NotebookRender from "./components/NotebookRender";
import NotebookHome from "./components/NotebookHome";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/notebook/new">
            <NotebookForm />
          </Route>
          <Route path="/notebook/note">This is where note will go</Route>

          <Route path="/notebook/:id">
            <NotebookHome />
          </Route>
          <Route path="/notebook">
            <NotebookRender />
          </Route>

          <Route path="*">The requested url could not be found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
