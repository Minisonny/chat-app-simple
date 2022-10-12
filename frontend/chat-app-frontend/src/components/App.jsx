import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import LogIn from "./LogIn";
import Register from "./Register";
import "@nordhealth/css";
import { Layout, Navigation, Dropdown, Button } from "@nordhealth/react";

const App = () => {
  useEffect(() => {
    // const io = socketIOClient(SERVER_URL);
  }, []);

  return (
    <div className="App">
      <Layout>
        <Navigation slot="nav">
          <Dropdown slot="header" expand>
            <Button slot="toggle" expand variant="switch"></Button>
          </Dropdown>
        </Navigation>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<LogIn />} />
          <Route exact path="/thread" element={<LogIn />} />
          <Route exact path="/messages" element={<LogIn />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
