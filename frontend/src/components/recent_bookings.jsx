import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { UserContext } from "../context/userContext";
const RecentBookings = () => {
    const navigate = useNavigate();
    const { user, loading} = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const [selectedHallName, setSelectedHallName] = useState("");

    useEffect(() => {
        if(!loading) {
            if(user?.role !== "admin" && user?.role !== "user" ) {
                navigate("/login", {
                    replace: true,
                })
            }
        }
        if (selectedHallName) {
            fetch("https://hall-booking-system-backend.onrender.com/api/v1/getBookings?hallName=" + selectedHallName.toUpperCase(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setBookings(data.data)
                    }
                    else toast.error(data.message);
                })
                .catch((error) => toast.error("Error fetching bookings"));
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
