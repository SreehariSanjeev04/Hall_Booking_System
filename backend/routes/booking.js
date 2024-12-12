const {getBookings, addBooking, removeBooking, confirmBooking, getAllBookings, userBookings} = require('../controllers/booking');
const router = require('express').Router();
const { validateAdmin, validateUser } = require('../middleware/auth');

router.get('/getBookings', getBookings)
    .post('/addBooking', validateUser, addBooking)
    .delete('/removeBooking', validateAdmin, removeBooking)
    .patch('/confirmBooking', validateAdmin, confirmBooking)
    .get('/getAllBookings', validateAdmin, getAllBookings)
    .post('/userBookings', validateUser, userBookings);
    
module.exports = router;