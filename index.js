require("dotenv").config();
const express = require("express");
const fetch = require('node-fetch');
const app = express();
const cors = require("cors");
const Todo = require("./models/todo");

app.use(express.json());
app.use(cors());

// GET /todos - returns a list of todos without user id field

app.get('/todos', async (req, res) => {
   // array to store the todo data
  const result = [];
  //to fetch todo data
  const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    .catch(error => {
      console.error(error);
    });
  let response = await data.json();
  for (i in response) {
    let newTodo = await new Todo({
      id: response[i].id,
      title: response[i].title,
      completed: response[i].completed,
    });
    result.push(newTodo)
  }

  console.log(JSON.stringify(result, null, ' '));
  // response the result
  res.send(JSON.stringify(result, null, ' '))
});

// GET /user/<pass-your-user-id> - returns user information along with todo items
// where userid matches with the one provided in the URL

app.get('/user/:userId', async (req, res) => {
  // array to store the todo data
  const todos = [];
  //to fetch user details
  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${req.params.userId}`)
    .catch(error => {
      console.error(error);
    });

    //to fetch todo data
  const dataTodos = await fetch('https://jsonplaceholder.typicode.com/todos')
    .catch(error => {
      console.error(error);
    });
  let responseTodos = await dataTodos.json();

  // filter the todo of userId and append them in todos array
  for (i in responseTodos) {
    if (responseTodos[i].userId == req.params.userId) {
      let newTodo = await new Todo({
        id: responseTodos[i].id,
        title: responseTodos[i].title,
        userId: responseTodos[i].userId,
        completed: responseTodos[i].completed,
      });
      todos.push(newTodo)
    }
  }
  let userResponse = await data.json();
  // add todo array to user
  userResponse["todo"]=todos;
  console.log(userResponse);
  res.send(JSON.stringify(userResponse, null, ' '))
})


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
