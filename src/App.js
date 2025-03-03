import React from "react";
import Form from "./components/Form/Form.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import Posts from "./components/Posts/Posts.js";
import Navbar from "./components/Navbar/Navbar.js";
import Profile from './components/UserProfile/Profile.js'
import PostDetails from "./components/Posts/PostDetails/PostDetails.js";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [currentId, setCurrentId] = React.useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      <Toaster />
      <Router>
        <Navbar />
        <Switch>

          {
            user &&
            <>
              <Route exact path="/">
                <Home currentId={currentId} />
              </Route>
              <Route exact path="/details/:id">
                <PostDetails />
              </Route>
              <Route exact path="/user-profile">
                <Profile />
              </Route>
              <Route exact path="/create">
                <Form setCurrentId={setCurrentId} />
              </Route>
              <Route exact path="/dashboard">
                <Posts setCurrentId={setCurrentId} />
              </Route>
            </>
          }

          <Route path="*">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;