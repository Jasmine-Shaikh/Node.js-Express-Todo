const { v4 } = require('uuid');
const todos = [];
// Fetch and display all todos
function fetchTodos(req, res) {
  return res.send(todos);
}

// Check whether task is sent empty
function checkData(req, res, next) {
  if (!req.body.task || !req.body.status) {
    return res.status(400).send("Add all reqiured details");
  }
  next();
}

//Create a todo
function createTodo(req, res) {
  const body = req.body;
  let todo = {
    id: v4(),
    task: body.task,
    status: body.status
  };
  todos.push(todo);
  res.status(201).send("Task added to your todo.");
}

//Update status of a todo
function updateTodo(req, res){
    let id = req.params.id;
    let index = -1;
    todos.forEach((todo, i) => {
      if (todo.id == id) {
        index = i;
        todos[index].status = req.body.status 
        return
      }
    });
    if (index === -1) {
      return res.status(404).send("Task does not exists");
    }
    res.status(200).send("Task updated.");
}

//Delete a todo
function deleteTodo(req, res) {
  let id = req.params.id;
  let index = -1;
  todos.forEach((todo, i) => {
    if (todo.id == id) {
      index = i;
      return
    }
  });
  if (index === -1) {
    return res.status(404).send("Task does not exists");
  }
  todos.splice(index, 1);
  res.status(200).send("Task deleted.");
}

module.exports = {fetchTodos,checkData,updateTodo,createTodo,deleteTodo};
