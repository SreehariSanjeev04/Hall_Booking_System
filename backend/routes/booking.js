const {getBookings, addBooking, removeBooking, confirmBooking, getAllBookings} = require('../controllers/booking');
const router = require('express').Router();
const { validateAdmin, validateUser } = require('../middleware/auth');

router.post('/getBookings', getBookings)
    .post('/addBooking', validateUser, addBooking)
    .delete('/removeBooking/:id', validateAdmin, removeBooking)
    .patch('/confirmBooking/:id', validateAdmin, confirmBooking)
    .get('/getAllBookings', validateAdmin, getAllBookings);
    
module.exports = router;