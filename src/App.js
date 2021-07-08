import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserProfile from "./containers/UserProfile";
import UsersList from "./containers/UsersList";

import "./styles.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={UsersList} />
        <Route exact path="/profile/:id" component={UserProfile} />
      </BrowserRouter>
    </div>
  );
};

export default App;
