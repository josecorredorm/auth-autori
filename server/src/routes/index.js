const routes = require("express").Router();
const LoginData = require('./LoginRoute/index.js')
const UserData = require('./UserRoute/index.js');

routes.use('/usuarios', UserData);
routes.use('/login', LoginData)

module.exports =routes; 