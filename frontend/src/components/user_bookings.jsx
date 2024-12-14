import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return; 
        
        if (!user || (user.role !== "admin" && user.role !== "user")) {
            navigate("/login", { replace: true });
            return;
        }

        const fetchBookings = async () => {
            try {
                const response = await fetch("https://hall-booking-system-backend.onrender.com/api/v1/userBookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        rollNumber: user?.rollNumber
                    })
                });
                const data = await response.json();

                if (data.success) {
                    setBookings(data.data);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Error fetching bookings");
            }
        };

        fetchBookings();
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {bookings.length > 0 ? (
                <section className="bg-white mt-24 shadow-lg rounded-md p-4 mx-1 w-[95%]">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        User Bookings
                    </h2>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking._id} className="mb-3 p-3 bg-gray-100 rounded-md">
                                <p className="text-lg font-semibold">{booking.user}</p>
                                <p className="text-lg">{booking.hallName}</p>
                                <p className="text-sm text-gray-600">
                                    Date: {new Date(booking.bookingDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Start Time: {new Date(booking.startTime).toLocaleTimeString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    End Time: {new Date(booking.endTime).toLocaleTimeString()}
                                </p>
                                <div className={`py-2 mt-3 text-center px-3 w-24 rounded-md ${booking.status === "Confirmed" ? "bg-green-400 text-green-700" : "bg-red-400 text-red-700"}`}>
                                        {booking.status}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : (
                <div>
                    <p className="text-xl font-semibold text-gray-800 mb-4">No recent bookings found</p>
                </div>
            )}
        </>
    );
};

export default UserBookings;
