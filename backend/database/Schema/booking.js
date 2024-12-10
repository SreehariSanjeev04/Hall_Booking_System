const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    hallName: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    startTime: { type: Date, required: true},
    endTime: { type: Date, required: true},
    user: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed'], default: 'Pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);