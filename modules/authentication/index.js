const express = require('express')
const router = express.Router()

let { login } = require('../../mocks')

router.get('/authentication', (req, res) => {
  res.json({ message: 'hello from authentication' })
})

router.post('/login', (req, res) => {
  return !req.body.username
  ? setTimeout(() => {
    res.status(422).send([
      {
        "field": "username",
        "index": 0,
        "message": "Preencha o nome de usuário"
      }
    ]) }, 2000) //simula um delay de processamento do server
  : setTimeout(() => { res.json(login) }, 1000)
})


/*

POST /login
input:
{
  username: '',
  password: ''
}

output:
{
  id: 0,
  name: ''
}

POST /logout

GET /users/:id
output:
{
  name: '',
  photo: '', (se tiver como),
  id: 0,
  username: ''
}

*/

module.exports = router