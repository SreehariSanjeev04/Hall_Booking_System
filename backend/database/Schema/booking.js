const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    hallName: { type: String, required: true },
    roomNo: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Confirmed'], default: 'Pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);