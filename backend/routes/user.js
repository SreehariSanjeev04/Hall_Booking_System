const {createUser, loginUser} = require('../controllers/user');
const router = require('express').Router();

router.post('/createUser', createUser)
.post('/loginUser', loginUser);

module.exports = router;