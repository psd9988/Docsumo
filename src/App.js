import { LoginPage } from "./components/LoginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
