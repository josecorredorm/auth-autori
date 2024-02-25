const router = require('express').Router();
const {validationFieldLogin, validateCredentials}= require('../../middleware/index');
const login = require('../../controller/LoginUser/LoginUserController');


router.post('/', validationFieldLogin, validateCredentials, login)

module.exports = router;