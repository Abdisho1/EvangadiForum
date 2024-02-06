import React from "react";
import "./Question.css";
import profile from "../../Images/User.png";

const Question = ({ question, userName }) => {
  return (
    <div className="container-fluid all__div">
      <div className="avatar-container">
        <img className="avatar" src={profile} alt="Avatar" />
        <h6 className="user">{userName}</h6>
      </div>
      <div className="quest">
        <h6 className="">{question}</h6>
      </div>
      <div className="">
        <i className="fa"></i>
      </div>
    </div>
  );
};

export default Question;
