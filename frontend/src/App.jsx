import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Upload from "./pages/Dashboard/Upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={<Upload />} 
        />

    </Routes>
  );
}

export default App;