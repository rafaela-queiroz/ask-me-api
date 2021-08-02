const express = require("express");
const router = express.Router();

let { login } = require("../../mocks");
let { users } = require("../../mocks");

router.get("/authentication", (req, res) => {
  res.json({ message: "hello from authentication" });
});

router.post("/login", (req, res) => {
  return !req.body.username
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
        let user = login.find((user) => user.username === req.body.username);

        user
          ? res.json(user)
          : res.status(404).send({ message: "Usuário não encontrado!" });
      }, 1000);
});

router.get("/users", (req, res) => {
  return setTimeout(() => {
    res.json(users);
  });
});

router.get("/users/:id", (req, res) => {
  return !req.params.id
    ? setTimeout(() => {
        res.status(400).send({
          field: "id",
          index: 0,
          message: "Campo ID é obrigatório",
        });
      })
    : setTimeout(() => {
        let user = users.find((user) => user.id === Number(req.params.id));

        user
          ? res.json(user)
          : res.status(404).send({ message: "Usuário não encontrado!" });
      });
});

module.exports = router;
