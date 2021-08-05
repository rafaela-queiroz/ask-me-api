const express = require("express");
const router = express.Router();
const { saveMock } = require("../../utils/saveMock");

let { questions } = require("../../mocks");
let { comments } = require("../../mocks");

const FILENAME = "questions.json";

router.get("/question", (req, res) => {
  res.json({ message: "hello from questions" });
});

router.get("/questions", (req, res) => {
  return setTimeout(() => {
    res.send(questions);
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

router.post("/question", (req, res) => {
  return !req.body.userId || !req.body.title || !req.body.body
    ? setTimeout(() => {
        res.status(422).send([
          {
            field: "erro",
            index: 0,
            message: "Preencha os campos obrigatórios",
          },
        ]);
      }, 2000)
    : setTimeout(() => {
        saveMock({
          fileName: FILENAME,
          newData: req.body,
          action: "create",
        });

        res.status(201).json({
          field: "success",
          index: 0,
          message: "Questão cadastrada com sucesso",
        });
      }, 1000);
});

router.put("/questions/:id", (req, res) => {
  return !req.body.userId || !req.body.body || !req.body.title
    ? setTimeout(() => {
        res.status(422).send([
          {
            field: "erro",
            index: 0,
            message: "Preencha os campos obrigatórios",
          },
        ]);
      }, 2000)
    : setTimeout(() => {
        saveMock({
          fileName: FILENAME,
          newData: { id: Number(req.params.id), ...req.body },
          action: "update",
        });

        res.json(req.body);
      }, 1000);
});

router.post("/questions/:id/comment", (req, res) => {
  return !req.body.userId || !req.body.body
    ? setTimeout(() => {
        res.status(422).send([
          {
            field: "erro",
            index: 0,
            message: "Preencha os campos obrigatórios",
          },
        ]);
      }, 2000)
    : setTimeout(() => {
        res.json(req.body);
      }, 1000);
});

module.exports = router;
