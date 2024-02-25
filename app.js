const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var path = require('path');
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const todosRepo = require('./src/todosFileRepository');

/* GET todos listing. */
app.get('/', function(req, res, next) {
  const data = todosRepo.findAll();
  res.send(data);
});

app.post('/add', function(req, res, next) {
    console.log(req.body);
    if (req.body.todoText.trim() === '') {
      res.send('Todo text can not be empty!');
    } else {
      todosRepo.create({text: req.body.todoText.trim()});
      res.redirect('/');
    }
  });


app.put('/:uuid/edit', function(req, res, next) {
    if (req.body.todoText.trim() === '') {
      res.send('Todo text can not be empty!');
    } else {
      const updatedTodo = {id: req.params.uuid, text: req.body.todoText.trim()};
      todosRepo.update(updatedTodo);
      res.redirect('/');
    }
});

app.delete('/:uuid/delete', function(req, res, next) {
    todosRepo.deleteById(req.params.uuid);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })