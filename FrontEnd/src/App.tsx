import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes/Routes";

function App() {
  return (
    <>
      <Router>
        <AppRouter />
      </Router>
    </>
  );
}

export default App;
