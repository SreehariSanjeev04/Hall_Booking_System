const {getBookings, addBooking, removeBooking, confirmBooking} = require('../controllers/booking');
const router = require('express').Router();

router.post('/getBookings', getBookings)
    .post('/addBooking', addBooking)
    .delete('/removeBooking/:id', removeBooking)
    .patch('/confirmBooking/:id', confirmBooking);
    
module.exports = router;