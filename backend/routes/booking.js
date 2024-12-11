const {getBookings, addBooking, removeBooking, confirmBooking, getAllBookings} = require('../controllers/booking');
const router = require('express').Router();
const { validateAdmin, validateUser } = require('../middleware/auth');

router.post('/getBookings', getBookings)
    .post('/addBooking', validateUser, addBooking)
    .delete('/removeBooking', validateAdmin, removeBooking)
    .patch('/confirmBooking', validateAdmin, confirmBooking)
    .get('/getAllBookings', validateAdmin, getAllBookings);
    
module.exports = router;