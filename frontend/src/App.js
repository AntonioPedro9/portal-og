import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.js";
import Home from "./pages/Home.js";
import VM from "./pages/VM.js";
import Container from "./pages/Container.js";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          <Route
            path="/vm"
            element={
              <>
                <NavBar />
                <VM />
              </>
            }
          />
          <Route
            path="/container"
            element={
              <>
                <NavBar />
                <Container />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
