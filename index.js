const express = require('express')
const handlers = require('./todo');

const port = 8000;
const app = express();

app.use(express.json());
app.get('/todo', handlers.fetchTodos);
app.post('/todo', handlers.checkData, handlers.createTodo);
app.put('/todo/:id', handlers.updateTodo);
app.delete('/todo/:id', handlers.deleteTodo);

app.all('/*', (req, res) => {
    res.send("Welcome to todo API.")
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})