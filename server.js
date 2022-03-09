const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
// const { default: Todo } = require('./src/components/Todo');
const port = process.env.PORT || 3001;

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', require('./routes/api/users.js'));
app.use(require('./config/auth'));
app.use('/api/todos', require('./routes/api/todos.js'));

// const Todo = require('./models/Todo')
// app.get('/todos', async (req, res) => {
//   const todos = await Todo.find()
//   res.json(todos)
// })

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});