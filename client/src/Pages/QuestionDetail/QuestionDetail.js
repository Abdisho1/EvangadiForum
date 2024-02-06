import React, { useEffect, useState } from "react";
import "./QuestionDetail.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AnswerQuestion from "../../Componnents/AnswerQuestion/AnswerQuestion";
import Answer from "../../Componnents/Answer/Answer";

const QuestionDetail = () => {
  let params = useParams();
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const questionByPostId = async () => {
    try {
      const question = await axios.get(
        `http://localhost:5000/api/questions/${params.id}`
      );
      setQuestion(question.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  };
  const answersByQuestionId = async () => {
    try {
      const answersRes = await axios.get(
        `http://localhost:5000/api/answers/${question?.question_id}`
      );
      setAnswers(answersRes.data.data);
      Navigate("/question/question?.question_id");
    } catch (err) {
      console.log("problem", err);
    }
  };
  useEffect(() => {
    questionByPostId();
    answersByQuestionId();
  }, [question?.question_id]);
  return (
    <div className="main__div container-fluid">
      <div className="cont">
        <h3>Question</h3>
        <h5>{question?.question}</h5>
        <p>{question?.question_description}</p>
        <hr />
      </div>
      <div className="cont">
        {answers.length > 0 && <h3>Answer From The Community</h3>}
      </div>
      {answers.map((answer) => (
        <div key={answer.answer_id} className="holder">
          <Answer answer={answer.answer} userName={answer.user_name} />
        </div>
      ))}

      <AnswerQuestion questionId={question?.question_id} />
    </div>
  );
};

export default QuestionDetail;
