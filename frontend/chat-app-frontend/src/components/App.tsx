import React, { useState } from "react";
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
import NotFound from "./empty-state/NotFound";
import Welcome from "./Welcome";
import { Nullable, NullableString, User } from "../types/common";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<Nullable<User>>(null);
  const [userList, setUserList] = useState<Array<User>>([]);
  const [toast, setToast] = useState<NullableString>(null);

  const onSignIn = async (user) => {
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

  const onThreadCreated = (title) => {
    setToast(`Thread "${title}" created`);
  };

  const onToastDismiss = () => {
    setToast(null);
  };

  return (
    <div className="App">
      <Layout navOpen={true}>
        <NavigationPanel user={loggedInUser} onSignOut={onSignOut} />
        <Routes>
          <Route path="/" element={<Welcome user={loggedInUser} />} />
          <Route path="/login" element={<LogIn onSignIn={onSignIn} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/thread"
            element={
              <ThreadView
                authorized={loggedInUser !== null}
                userList={userList}
              />
            }
          />
          <Route
            path="/thread-create"
            element={
              <ThreadCreate
                authorized={loggedInUser !== null}
                userList={userList}
                onThreadCreated={onThreadCreated}
              />
            }
          />
          <Route
            path="/thread/:id"
            element={
              <MessageView
                authorized={loggedInUser !== null}
                userList={userList}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
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
