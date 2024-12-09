import { useEffect, useState } from "react";
import { toast } from 'sonner'
const RecentBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedHallName, setSelectedHallName] = useState("");

    useEffect(() => {
        if (selectedHallName) {
            fetch("http://localhost:3000/api/v1/getBookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hallName: selectedHallName.toUpperCase(),
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setBookings(data.data)
                        console.log(bookings);
                    }
                    else toast.error(data.message);
                })
                .catch((error) => console.error("Error fetching bookings:", error));
        }
    }, [selectedHallName]);

    const handleSelectChange = (event) => {
        setSelectedHallName(event.target.value);
    };

    return (
        <div className="mt-24 ml-2 md:ml-5 w-full">
            <section className="px-2 py-1 md:px-6 md:py-3 rounded-md bg-white shadow-lg inline-block mb-5">
                <label
                    htmlFor="dropdown"
                    className="text-sm md:text-lg font-medium text-gray-700 mr-5"
                >
                    Select Hall
                </label>

                <select
                    name="dropdown"
                    id="dropdown"
                    value={selectedHallName}
                    onChange={handleSelectChange}
                    className="font-semibold px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all w-full md:w-auto"
                >
                    <option value="">Select Hall</option>
                    <option value="Aryabhatta Hall">Aryabhatta Hall</option>
                    <option value="Bhaskara Hall">Bhaskara Hall</option>
                    <option value="Chanakya Hall">Chanakya Hall</option>
                    <option value="OAT">OAT</option>
                    <option value="Soms Auditorium">Soms Auditorium</option>
                </select>
            </section>

            {bookings.length > 0 ? (
                <section className="bg-white shadow-lg rounded-md p-4 mx-1 w-[95%]">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Recent Bookings for {selectedHallName}
                    </h2>
                    <ul>
                        {bookings.map((booking) => (
                            <li
                                key={booking._id}
                                className="mb-3 p-3 bg-gray-100 rounded-md"
                            >
                                <p className="text-lg font-semibold">{booking.user}</p>
                                <p className="text-sm text-gray-600">
                                    Date: {new Date(booking.bookingDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Start Time: {new Date(booking.startTime).toLocaleTimeString()}
                                    
                                </p>
                                <p className="text-sm text-gray-600">
                                    End Time: {new Date(booking.endTime).toLocaleTimeString()}
                                </p>
                            
                            </li>
                        ))}
                    </ul>
                </section>
            ) : <div>
                <p className="text-xl font-semibold text-gray-800 mb-4">No recent bookings found</p>
            </div>}
        </div>
    );
};

export default RecentBookings;
