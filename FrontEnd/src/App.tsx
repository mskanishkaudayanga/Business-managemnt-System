import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes/Routes";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <Router> {/* This is the ONLY Router */}
        <AppRouter />
      </Router>
    </React.StrictMode>
  );
}

export default App;
