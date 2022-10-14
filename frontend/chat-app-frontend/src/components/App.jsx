import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import LogIn from "./login/LogIn";
import Register from "./login/Register";
import "@nordhealth/css";
import { Layout, ToastGroup, Toast } from "@nordhealth/react";
import NavigationPanel from "./navigation/NavigationPanel";
import ThreadView from "./thread/ThreadView";

const App = () => {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // const io = socketIOClient(SERVER_URL);
  }, []);

  const onSignIn = user => {
    setUser(user);
    setToast("Logged in successfully");
  };

  const onSignOut = () => {
    setUser(null);
    setToast("Logged out successfully");
  };

  const onToastDismiss = () => {
    setToast(null);
  };

  return (
    <div className="App">
      <Layout navOpen={true}>
        <NavigationPanel user={user} onSignOut={onSignOut}></NavigationPanel>
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
            element={<ThreadView authorized={user !== null} />}
          />
          <Route
            exact
            path="/thread-create"
            element={<LogIn onSignIn={onSignIn} />}
          />
          <Route
            exact
            path="/thread/:id"
            element={<LogIn onSignIn={onSignIn} />}
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
