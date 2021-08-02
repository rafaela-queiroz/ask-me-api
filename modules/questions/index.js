const express = require("express");
const router = express.Router();

let { questions } = require("../../mocks");
let { comments } = require("../../mocks");

router.get("/question", (req, res) => {
  res.json({ message: "hello from questions" });
});

router.get("/questions", (req, res) => {
  return setTimeout(() => {
    res.send(questions);
  }, 1000);
});

router.post("/question", (req, res) => {
  return req.headers.token === "xpto"
    ? setTimeout(() => {
        res.status(422).send([
          {
            field: "username",
            index: 0,
            message: "Preencha o nome de usuário",
          },
        ]);
      }, 2000)
    : setTimeout(() => {
        res.json(questions);
      }, 1000);
});

router.get("/questions/:id", (req, res) => {
  return !req.params.id
    ? setTimeout(() => {
        res.status(400).send({
          field: "id",
          index: 0,
          message: "Campo ID é obrigatório",
        });
      })
    : setTimeout(() => {
        let question = questions.find(
          (question) => question.id === Number(req.params.id)
        );

        question
          ? res.json(question)
          : res.status(404).send({ message: "Pergunta não encontrada!" });
      });
});

router.get("/questions/:id/comments", (req, res) => {
  return !req.params.id
    ? setTimeout(() => {
        res.status(400).send({
          field: "id",
          index: 0,
          message: "Campo ID é obrigatório",
        });
      })
    : setTimeout(() => {
        let questionComments = comments.filter(
          (comment) => comment.questionId === Number(req.params.id)
        );

        res.json(questionComments);
      });
});

/*

PUT  /questions/:id
input:
{
  : '',
}


POST /questions/:id/comments
input:
{
  body: '',
  userId: 0
}

*/

module.exports = router;
