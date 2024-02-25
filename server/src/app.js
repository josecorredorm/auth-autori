require('./database/db.js')
const express = require('express')
const morgan = require('morgan')
const cors =require('cors')
const routes =require('./routes/index.js')

const app = express();

//middlewares
app.use(express());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// rutas

app.use('/', routes);

module.exports = app
