import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Header from "./Componnents/Header/Header";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import Footer from "./Componnents/Footer/Footer";
import QuestionDetail from "./Pages/QuestionDetail/QuestionDetail";
import NotFound from "./Pages/NotFound/NotFound";
// import ForgotPassword from "./Pages/ForgotPassword/ResetByNewPassword";
import ResetSent from "./Pages/ForgotPassword/ResetSent";
import ResetPassword from "./Pages/ResetPassword/ResetPassord";
// import ResetByNewPassword from "./Pages/ForgotPassword/ResetByNewPassword";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        const userRes = await axios.get("http://localhost:5000/api/users", {
          headers: { "x-auth-token": token },
        });
        // console.log(userRes);
        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (err) {
        console.log(err);
      };
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header logout={logout} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/reset-sent" element={<ResetSent />} />
        {/* <Route path="/reset" element={<ResetByNewPassword />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
