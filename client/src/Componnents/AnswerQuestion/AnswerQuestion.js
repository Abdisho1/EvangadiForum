import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./AnswerQuestion.css";

const AnswerQuestion = ({ questionId }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/answers", {
        id: userData.user.id,
        questionId: questionId,
        answer: form.answer,
      });
      window.location.reload(false);
    } catch (err) {
      console.log("problem", err);
    }
  };
  return (
    <div className="the__whole container-fluid">
      <form onSubmit={handleSubmit} className="answer_form">
        <h3 className="">Answer The Top Question</h3>
        <Link to="/" className="go__to">
          Go to Question page
        </Link>
        <textarea
          onChange={handleChange}
          className="answer_input"
          placeholder="Your Answer..."
          name="answer"
          id=""
        ></textarea>
        <button className="answer_post_btn" type="">
          Post Your Answer
        </button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
