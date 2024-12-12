const Booking = require('../database/Schema/booking');
const mongoose = require('mongoose');

exports.getAllBookings = async (req, res) => {
    try {
        console.log(new Date().toLocaleDateString());
        const allBookings = await Booking.find({
            bookingDate: { $gte: new Date()},
        }).sort({ bookingDate: -1 });
        res.status(200).json({
            success: true,
            data: allBookings,
            message: 'All bookings fetched successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching all bookings'
        });
    }
}
exports.userBookings = async (req, res) => {
    try {
        const { rollNumber } = req.body;
        console.log(new Date().toLocaleDateString());
        const allBookings = await Booking.find({
            user: rollNumber,
            bookingDate: { $gte: new Date()},
        }).sort({ bookingDate: -1 });
        res.status(200).json({
            success: true,
            data: allBookings,
            message: 'User bookings fetched successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching all bookings'
        });
    }
}
exports.getBookings = async (req, res) => {
    const { hallName } = req.query;

    if (!hallName) {
        return res.status(400).json({
            success: false,
            message: 'Hall name must be provided'
        });
    }

    const modifiedHallName = hallName.split('%').join(' ');  
    console.log(modifiedHallName);

    try {
        const hallBookings = await Booking.find({
            hallName: modifiedHallName,
            bookingDate: {
                $gte: new Date()  
            },
            status: 'Confirmed'
        })
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
            message: 'An error occurred while fetching bookings'
        });
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
            hallName: hallName,
            bookingDate: modifiedBookingDate,
            startTime: modifiedStartTime,
            endTime: modifiedEndTime,
            user: user,
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

exports.removeBooking = async (req, res) => {
    const { ids } = req.body;
    try {
        if (!ids || !Array.isArray(ids) || !ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid Request"
            });
        }

        const convertedIds = ids.map(id => new mongoose.Types.ObjectId(id));

        const result = await Booking.deleteMany({
            _id: { $in: convertedIds }
        });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} bookings deleted successfully`
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


exports.confirmBooking = async (req, res) => {
    const { ids } = req.body;
    console.log('Received IDs:', ids);

    if (!ids || !Array.isArray(ids) || !ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
        console.log('Validation Failed');
        return res.status(400).json({
            success: false,
            message: "Invalid Request"
        });
    }

    try {
        const convertedIds = ids.map(id => new mongoose.Types.ObjectId(id));

        const result = await Booking.updateMany(
            { _id: { $in: convertedIds }, status: { $ne: "Confirmed" } }, 
            { $set: { status: "Confirmed" } } 
        );

        console.log('Update Result:', result);

        res.status(200).json({
            success: true,
            message: `${result.modifiedCount} bookings confirmed successfully`
        });
    } catch (err) {
        console.error('Error during update:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
