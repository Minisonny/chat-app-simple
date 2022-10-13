import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import LogIn from "./login/LogIn";
import Register from "./login/Register";
import "@nordhealth/css";
import { Layout } from "@nordhealth/react";
import NavigationPanel from "./navigation/NavigationPanel";
import ThreadView from "./thread/ThreadView";

const App = () => {
  useEffect(() => {
    // const io = socketIOClient(SERVER_URL);
  }, []);

  return (
    <div className="App">
      <Layout navOpen={true}>
        <NavigationPanel></NavigationPanel>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<LogIn />} />
          <Route exact path="/thread" element={<ThreadView />} />
          <Route exact path="/thread-create" element={<LogIn />} />
          <Route exact path="/thread/:id" element={<LogIn />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
