const express = require('express');
const personsRouter = require('./routes/persons');
const infoRouter = require('./routes/info');
const morgan = require('morgan');

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

app.use(express.json());

app.use('/api/persons', personsRouter);
app.use('/info', infoRouter);

app.listen(3001, error => {
  if (error) throw error;
  console.log('server running on port 3001');
});
