const { checkToken } = require("../../auth/token_validation");
const router = require('express').Router();
const userController = require('../controllers/user.controller');


router.post('/signup', userController.register)
router.post('/login', userController.login)
router.get('/getallusers', checkToken, userController.getallusers)



module.exports = router;