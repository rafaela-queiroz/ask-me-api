const express = require('express')
const router = express.Router()

let { questions } = require('../../mocks')

router.get('/question', (req, res) => {
  res.json({ message: 'hello from questions' })
})

router.get('/questions', (req,res) => setTimeout(() => {
  res.send(questions)
}, 1000))

router.post('/question', (req, res) => {
  return !req.body.username
  ? setTimeout(() => {
    res.status(422).send([
      {
        "field": "username",
        "index": 0,
        "message": "Preencha o nome de usuário"
      }
    ]) }, 2000) //simula um delay de processamento do server
  : setTimeout(() => { res.json(questions) }, 1000)
})

/*

GET  /questions
output:
[
 {
   id: 0,
   userId: 0,
   title: '',
   body: ''
 }
]

GET  /questions/:id
output:
{
  id: 0,
  userId: 0,
  title: '',
  body: ''
}

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


GET  /questions/:id/comments
output:
{
  id: 0,
  body: '',
  userId: 0
}

*/

module.exports = router