const {createUser, loginUser, checkValidUser} = require('../controllers/user');
const router = require('express').Router();

router.post('/createUser', createUser)
.post('/loginUser', loginUser)
.get('/checkValidUser', checkValidUser)

module.exports = router;