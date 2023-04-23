import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let user = sessionStorage.getItem("username");
    if (user === "" || user === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <ToastContainer theme="colored" position="top-center" />
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
