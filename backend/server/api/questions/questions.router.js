const router = require("express").Router();
const {
  getQuestionById,
  getQuestions,
  createQuestion,
} = require("./questions.controller");

router.post("/", createQuestion);
router.get("/:id", getQuestionById);
router.get("/", getQuestions);

module.exports = router;
