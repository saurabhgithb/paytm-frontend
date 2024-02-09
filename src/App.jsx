import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { currentUser } from "./store/atoms/auth";
import axios from "axios";
import Welcome from "./pages/Welcome";

function App() {
  const [me, setMe] = useRecoilState(currentUser);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/api/v1/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((res) => {
        if (res.status === 200) setMe(res.data.user);
        if (res.status === 403) {
          setMe(null);
        }
      });
  }, [me]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </Router>
  );
}

export default App;
