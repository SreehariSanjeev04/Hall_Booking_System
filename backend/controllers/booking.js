const Booking = require('../database/Schema/booking');

exports.getBookings = async(req, res) => {
    const {hallName} = req.body;
    if(!hallName) {
        return res.status(400).json({message: 'Hall name must be provided'});
    }
    const hallBookings = await Booking.find({hallName: hallName}).limit(5);
    res.status(200).json(hallBookings);
}
exports.addBooking = async(req, res) => {
    const {hallName, bookingDate, startTime, endTime, user} = req.body;
    if(!hallName ||!bookingDate ||!startTime ||!endTime || !user) {
        return res.status(400).json({message: 'All fields must be provided'});
    }
    const existingBooking = await Booking.findOne({hallName: hallName, bookingDate: bookingDate, startTime: {
        $gte: startTime,
        $lt: endTime
    }, endTime: {
        $gt: startTime,
        $lte: endTime
    }});
    if(existingBooking) {
        return res.status(409).json({message: 'Booking already exists'});
    }
    const newBooking = new Booking({hallName, bookingDate, startTime, endTime, user});
    await newBooking.save();
    res.status(201).json(newBooking);
}
exports.removeBooking = async(req, res) => {
    const {hallName, bookingDate, startTime, endTime, user} = req.body;
    if(!hallName ||!bookingDate ||!startTime ||!endTime ||!user) {
        return res.status(400).json({message: 'All fields must be provided'});
    }
    const deletedBooking = await Booking.findOneAndDelete({hallName: hallName, bookingDate: bookingDate, startTime: startTime, endTime: endTime});
    if(!deletedBooking) {
        return res.status(404).json({message: 'Booking not found'});
    }
    res.status(200).json(deletedBooking);
}
exports.confirmBooking = async(req, res) => {
    const {hallName, bookingDate, startTime, endTime, user} = req.body;
    if(!hallName ||!bookingDate ||!startTime ||!endTime ||!user) {
        return res.status(400).json({message: 'All fields must be provided'});
    }
    const updatedBooking = await Booking.findOneAndUpdate({hallName: hallName, bookingDate: bookingDate, startTime: startTime, endTime: endTime}, {status: 'Confirmed'}, {new: true});
    if(!updatedBooking) {
        return res.status(404).json({message: 'Booking not found'});
    }
    res.status(200).json(updatedBooking);
}