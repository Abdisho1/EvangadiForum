import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import "./SignUp.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", form);
      const loginRes = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
      alert(error.response.data.msg);
    }
  };

  // to change type attribute from 'password' to 'text' and vice versa
  const [icon, setIcon] = useState(eyeOff);
  // to change the icon when clicked
  const HandleIconChange = () => {
    // event listen for Password function
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <div className="login__page">
      <div className="login__container">
        <div className="main container-fluid">
          <p className="p1">Join the network</p>
          <p className="p2 lorem">
            Already have an account?
            <Link to="/login" className="a3">
              Sign in
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="in1 container-fluid"
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
            />
            <div className="FLname">
              <input
                className="in1 container-fluid"
                name="firstName"
                onChange={handleChange}
                type="text"
                placeholder="First Name"
              />

              <input
                className="in1 container-fluid"
                name="lastName"
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
              />
            </div>

            <input
              className="in1 container-fluid"
              name="userName"
              onChange={handleChange}
              type="text"
              placeholder="User Name"
            />

            <input
              className="in1 container-fluid"
              onChange={handleChange}
              name="password"
              type={type}
              placeholder="Password"
            />
            <span className="showHide2">
              <Icon icon={icon} size={20} onClick={HandleIconChange} />
            </span>
            <p className="">
            I agree to the
            <Link to="" className="a22">
              privacy policy
            </Link>
            and
            <Link to="" className="a22">
              terms of serivice.
            </Link>
          </p>
            <button className="btn1 container-fluid">Agree and Join</button>
          </form>

          <Link to="/login" className="a3 container-fluid">
            Already have an account?
          </Link>
        </div>
        <div className="SignupNote container-fluid">
          <p className="forTitle">About</p>
          <h1>Evangadi Networks Q&A</h1>
          <p className="lorem">
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolor
            odio harum sunt, quaerat, molestias fuga expedita ad excepturi
            officiis aliquam aut nemo ratione culpa id laborum ipsum porro
            tempore?
          </p>
          <button className="btn2">HOW IT WORKS</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
