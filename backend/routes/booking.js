const {getBookings, addBooking, removeBooking, confirmBooking} = require('../controllers/booking');
const router = require('express').Router();

router.get('/getBookings', getBookings)
    .post('/addBooking', addBooking)
    .delete('/removeBooking/:id', removeBooking)
    .patch('/confirmBooking/:id', confirmBooking);
    
module.exports = router;