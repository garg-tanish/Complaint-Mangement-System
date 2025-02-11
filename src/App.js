import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetails from "./components/Posts/PostDetails/PostDetails.js";
import Auth from "./components/Auth/Auth.js";
import AdminAuth from "./components/Auth/AdminAuth.js";
// import NotFoundPage from "./components/NotFoundPage/NotFoundPage.js";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Router>
      <Navbar />
      <Switch>

        {user && (<>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create">
            <Form setCurrentId={setCurrentId} />
          </Route>
          <Route exact path="/dashboard">
            <Posts setCurrentId={setCurrentId} />
          </Route>
          <Route exact path="/details/:id">
            <PostDetails />
          </Route>

          {user.result.isAdmin && (
            <Route exact path="/auth/admin">
              <AdminAuth />
            </Route>
          )}
        </>)
        }

        <Route path="*">
          <Auth />
        </Route>
        {/* <Route path="*">
          <NotFoundPage />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
