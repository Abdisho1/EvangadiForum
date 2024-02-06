import React, { useState } from "react";
import axios from "axios";
import './ResetPassword.css'
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );
      navigate("/reset-sent");
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div classname="container">
      <div className="wrap">
        <div className="resetByEmail">
          <h2>Reset your password</h2>
          <p>
            Fill in your e-mail address below and we will send you an email with
            further instructions.
          </p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleReset}>Reset your password</button>
          <br />
          <br />
          <Link to="/login">Already have an account?</Link>
          <br />
          <br />
          <Link to="/signup">Don't have an account?</Link>
          <p>{message}</p>
        </div>
        <div className="descriptionStyle">
          <p className="about">About</p>
          <h1>Evangadi Networks Q&A</h1>
          <p>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            ipsum, provident minus laudantium esse soluta maiores nostrum nisi
            sunt perferendis dolorum. Praesentium necessitatibus quia
            consectetur sunt tempora possimus eveniet voluptates?
          </p>
          <button>How it Works</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;