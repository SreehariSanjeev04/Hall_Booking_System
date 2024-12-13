const { CronDatabaseCleanup } = require('./database/cleanup');
const cron = require('node-cron');

const StartCronJobs = () => {
    console.log('Cron Jobs scheduled.');
    cron.schedule('0 0 * * *', () => {
        console.log('Running daily cleanup for outdated bookings...');
        CronDatabaseCleanup();
    });
}

module.exports = { StartCronJobs };

