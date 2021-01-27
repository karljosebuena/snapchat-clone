import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import './App.css';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, resetImage, selectUser } from './features/appSlice';
import { auth } from './firebase';
import Login from './Login';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(resetImage());
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
            <>
              <img
                className="app__logo"
                src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
                alt=""
              />
              <div className="app__body">
                <div className="app__bodyBackground">
                  <Switch>
                    <Route path="/chats/view">
                      <ChatView />
                    </Route>
                    <Route path="/chats">
                      <Chats />
                    </Route>
                    <Route path="/preview">
                      <Preview />
                    </Route>
                    <Route exact path="/">
                      <WebcamCapture />
                    </Route>
                  </Switch>

                </div>
              </div>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;
