import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.js";
import Home from "./pages/Home.js";
import VM from "./pages/VM.js";
import Container from "./pages/Container.js";

export default function App() {
  return (
    <>
      <NavBar />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vm" element={<VM />} />
          <Route path="/container" element={<Container />} />
        </Routes>
      </Router>
    </>
  );
}
