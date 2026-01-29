const express = require('express');
const personsRouter = require('./routes/persons');
const infoRouter = require('./routes/info');
const morgan = require('morgan');
const { join } = require('node:path');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./errors/errorHandler');
const notFoundError = require('./errors/notFound');

const PORT = process.env.PORT || 3001;
const distDirectory = join(__dirname, '../', 'dist');

const app = express();
app.use(cors());

app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

app.use(express.static(distDirectory));

app.use('/api/persons', personsRouter);
app.use('/info', infoRouter);

app.use(notFoundError);

app.use(errorHandler);

app.listen(PORT, error => {
  if (error) throw error;
  console.log('server running on port 3001');
});
