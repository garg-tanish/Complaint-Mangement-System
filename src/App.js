import React from "react";
import Form from "./components/Form/Form.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import Posts from "./components/Posts/Posts.js";
import Navbar from "./components/Navbar/Navbar.js";
import AdminAuth from "./components/Auth/AdminAuth.js";
import PostDetails from "./components/Posts/PostDetails/PostDetails.js";

import { useDispatch } from "react-redux";
import { getPosts } from "./actions/post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [currentId, setCurrentId] = React.useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  React.useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Router>
      {user && <Navbar />}
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
      </Switch>
    </Router>
  );
};

export default App;
