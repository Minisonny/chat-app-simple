import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import LogIn from "./login/LogIn";
import Register from "./login/Register";
import "@nordhealth/css";
import { Layout, ToastGroup, Toast } from "@nordhealth/react";
import NavigationPanel from "./navigation/NavigationPanel";
import ThreadView from "./thread/ThreadView";
import MessageView from "./message/MessageView";
import { unsetToken } from "../api/tokenManager";
import { listUsers } from "../api/userApi";
import ThreadCreate from "./thread/ThreadCreate";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // const io = socketIOClient(SERVER_URL);
  }, []);

  const onSignIn = async user => {
    setLoggedInUser(user);
    setToast("Logged in successfully");

    const listOfUsers = await listUsers();
    setUserList(listOfUsers);
  };

  const onSignOut = () => {
    unsetToken();
    setLoggedInUser(null);
    setUserList([]);
    setToast("Logged out successfully");
  };

  const onThreadCreated = title => {
    setToast(`Thread "${title}" created`);
  };

  const onToastDismiss = () => {
    setToast(null);
  };

  return (
    <div className="App">
      <Layout navOpen={true}>
        <NavigationPanel
          user={loggedInUser}
          onSignOut={onSignOut}
        ></NavigationPanel>
        <Routes>
          <Route exact path="/" element={<LogIn onSignIn={onSignIn} />} />
          <Route exact path="/login" element={<LogIn onSignIn={onSignIn} />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/profile"
            element={<LogIn onSignIn={onSignIn} />}
          />
          <Route
            exact
            path="/thread"
            element={
              <ThreadView
                authorized={loggedInUser !== null}
                userList={userList}
              />
            }
          />
          <Route
            exact
            path="/thread-create"
            element={
              <ThreadCreate
                userList={userList}
                onThreadCreated={onThreadCreated}
              />
            }
          />
          <Route
            exact
            path="/thread/:id"
            element={<MessageView userList={userList} />}
          />
        </Routes>
        <ToastGroup>
          {toast !== null && (
            <Toast autoDismiss={2000} onDismiss={onToastDismiss}>
              {toast}
            </Toast>
          )}
        </ToastGroup>
      </Layout>
    </div>
  );
};

export default App;
