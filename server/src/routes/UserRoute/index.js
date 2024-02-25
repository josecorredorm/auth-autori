const router = require('express').Router();
const {validationFieldRegistrer, validationEmail,verifyToken} = require('../../middleware/index.js')
const userRegistrer = require('../../controller/UserRegistrer/userRegistrerController.js')
const userAccess = require('../../controller/AccessUser/AccessUserController.js')

router.get('/',verifyToken,userAccess)

router.post('/',validationFieldRegistrer, validationEmail, userRegistrer)

module.exports = router;