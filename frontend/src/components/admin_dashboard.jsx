import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminAnalytics = ({bookingData}) => {
    const dateBookingCount = {};
    const uniqueDate = [];
    bookingData.forEach((bookingData) => {
        const bookingDate = new Date(bookingData.bookingDate).toLocaleDateString();
        if (dateBookingCount[bookingDate]) {
            dateBookingCount[bookingDate]++;
        } else {
            dateBookingCount[bookingDate] = 1;
        }
        if(!uniqueDate.includes(bookingDate)) {
            uniqueDate.push(bookingDate);
        }
    });

    const data = {
        labels: uniqueDate.sort(),
        datasets: [
            {
                label: 'Bookings Over Time',
                data: uniqueDate.map(date => dateBookingCount[date]),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="p-4 bg-white h-full w-full rounded-md shadow-lg">
            <h1 className="text-lg md:text-2xl font-semibold mb-4">Analytics</h1>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-700 p-4 text-white rounded-md shadow-md">
                    <h2 className="text-md md:text-xl font-bold mb-2">Total Bookings</h2>
                    <p className="text-2xl md:text-5xl font-semibold">{bookingData.length}</p>
                    <p className="text-sm md:text-md mt-2">Total number of bookings made</p>
                </div>

                <div className="bg-blue-700 p-4 text-white rounded-md shadow-md">
                    <h2 className="text-md md:text-xl font-bold mb-2">Pending Requests</h2>
                    <p className="text-2xl md:text-5xl font-semibold">
                        {bookingData.reduce((a, data) => a + (data.status === "Pending" ? 1 : 0), 0)}
                    </p>
                    <p className="text-sm md:text-md mt-2">Total number of pending requests</p>
                </div>

                <div className="col-span-1 md:col-span-2 h-48 md:h-96 bg-gray-100 p-2 md:p-6 rounded-md shadow-md">
                    <h2 className="text-md md:text-xl font-semibold mb-4">Booking Trends</h2>
                    <div className="md:h-72 w-full">
                        <Line data={data} options={{ responsive: true, maintainAspectRatio: true }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
