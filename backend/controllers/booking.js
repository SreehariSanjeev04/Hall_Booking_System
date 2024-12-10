const Booking = require('../database/Schema/booking');

exports.getBookings = async (req, res) => {
    const { hallName } = req.body;
    console.log(hallName)
    if (!hallName) {
        return res.status(400).json({ 
            success: false,
            message: 'Hall name must be provided' });
    }

    try {
        const hallBookings = await Booking.find({ hallName: hallName })
            .sort({ bookingDate: -1 })
            .limit(5);
        res.status(200).json({
            success: true,
            data: hallBookings,
            message: 'Bookings fetched successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred while fetching bookings' });
    }
};

exports.addBooking = async (req, res) => {
    const { hallName, bookingDate, startTime, endTime, user } = req.body;

    if (!hallName || !bookingDate || !startTime || !endTime || !user) {
        return res.status(400).json({ message: "All fields must be provided." });
    }

    try {
        const modifiedBookingDate = new Date(bookingDate);
        const modifiedStartTime = new Date(startTime);
        const modifiedEndTime = new Date(endTime);

        if (
            isNaN(modifiedBookingDate.getTime()) ||
            isNaN(modifiedStartTime.getTime()) ||
            isNaN(modifiedEndTime.getTime())
        ) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid date format provided." });
        }

        if (modifiedStartTime >= modifiedEndTime) {
            return res.status(400).json({ 
                success: false,
                message: "Start time must be before end time." });
        }

        const existingBooking = await Booking.findOne({
            hallName: hallName,
            bookingDate: modifiedBookingDate,
            $or: [
                { startTime: { $lt: modifiedEndTime, $gte: modifiedStartTime } },
                { endTime: { $gt: modifiedStartTime, $lte: modifiedEndTime } },
            ],
        });

        if (existingBooking) {
            return res.status(409).json({ 
                success: false,
                message: "Booking already exists." });
        }

        const newBooking = new Booking({
            hallName,
            bookingDate: modifiedBookingDate,
            startTime: modifiedStartTime,
            endTime: modifiedEndTime,
            user,
        });

        await newBooking.save();
        res.status(201).json({
            success: true,
            message: "Booking requested successfully.",
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error." });
    }
};

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