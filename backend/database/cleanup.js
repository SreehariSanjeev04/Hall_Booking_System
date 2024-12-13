const Booking = require('./Schema/booking');

exports.CronDatabaseCleanup = async () => {
    const currentDate = new Date();
    const lastWeek = new Date(currentDate.setDate(currentDate.getDate() - 7));
    try {
        await Booking.deleteMany({
            bookingDate: {
                $lt: lastWeek
            }
        });
        console.log(`Booking records until ${lastWeek.toLocaleDateString()} deleted successfully.`);
    } catch (err) {
        console.error(`Error deleting booking records: ${err}`);
    }
}