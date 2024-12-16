import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import { toast } from 'sonner';
import AdminDashBoard from "../src/components/admin_dashboard";
import { UserContext } from "../src/context/userContext";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
const AdminPanel = () => {
    const {user, setUser} = useContext(UserContext)
    const menu_links = ["Dashboard", "Requests"];
    const menu_symbols = [<MdDashboard />, <FaClock />];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [requests, setRequests] = useState([]);
    const [confirmationIds, setConfirmationIds] = useState([]);
    const [rejectionIds, setRejectionIds] = useState([]);
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("token");
        window.location.reload();
    } 
    useEffect(() => {
        fetch("https://hall-booking-system-backend.onrender.com/api/v1/getAllBookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setRequests(response.data);
                } else {
                    toast.error(response.message);
                }
            });
    }, []);

    const handleApprove = (id) => {
        setConfirmationIds((prevConfirmationIds) => [...prevConfirmationIds, id]);
        setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
    };

    const handleReject = (id) => {
        setRejectionIds((prevRejectionIds) => [...prevRejectionIds, id]);
        setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
    };

    const handleSaveChanges= () => {
        handleBookingActions(confirmationIds, rejectionIds);
        setConfirmationIds([]);
        setRejectionIds([]);
    }

    const handleBookingActions = async (confirmationIds, rejectionIds) => {
        try {
            if (confirmationIds.length > 0) {
                const confirmationBlob = await fetch("https://hall-booking-system-backend.onrender.com/api/v1/confirmBooking", {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ ids: confirmationIds }),
                });
                const confirmationResponse = await confirmationBlob.json();
                if(confirmationResponse.success) {
                    toast.success(confirmationResponse.message);
                }
            }

            if (rejectionIds.length > 0) {
                const rejectionBlob = await fetch("https://hall-booking-system-backend.onrender.com/api/v1/removeBooking", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ ids: rejectionIds }),
                });
                const rejectionResponse = await rejectionBlob.json();
                if(rejectionResponse.success) {
                    toast.success(rejectionResponse.message);
                }
            }
        } catch (error) {
            toast.error("Error processing bookings.");
        }
    };

    return (
        <div className="h-screen flex">
            <div className="bg-white h-full w-20 md:w-64 fixed top-0 left-0 z-20">
                <img src="/nit_logo.svg" className="h-16 md:h-32 m-auto mt-3" alt="NIT Logo" />
                <ul className="p-4">
                    {menu_links.map((link, index) => (
                        <li
                            key={index}
                            className={`flex mb-2 cursor-pointer font-semibold tracking-tighter items-center gap-3 rounded-md p-4 hover:bg-blue-300 hover:duration-500 ${selectedIndex === index ? "bg-blue-300" : ""}`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {menu_symbols[index]} <p className="hidden md:block">{link}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-100 flex-1 h-screen ml-20 md:ml-64">
                <div className="fixed top-0 left-20 md:left-64 h-20 bg-white w-full shadow-md z-10 flex justify-between items-center px-3">
                    <div>
                        <h1 className="text-black text-2xl font-bold">Admin Panel</h1>
                        <h3>{user.rollNumber}</h3>
                    </div>
                    {
                        user ? <a className="text-black rounded-lg mr-24 md:mr-72 flex items-center group hover:bg-black py-2 px-3 transition-colors duration-300 cursor-pointer"  onClick={handleLogout}   >
                            <span className="text-md font-bold mr-2 group-hover:text-white transition-colors duration-300">Logout</span>
                            <CiLogout className="h-7 w-7 group-hover:text-white transition-colors duration-300"/>
                        </a> : <a className="text-black pr-24 md:pr-72 flex items-center group py-2 px-3 transition-colors duration-300 cursor-pointer" href="/login" >
                            <span className="text-md font-bold mr-2 group-hover:text-white transition-colors duration-300">Login</span>
                            <CiLogin className="h-7 w-7 group-hover:text-white transition-colors duration-300" />
                        </a>
                    }
                </div>

                <div className="pt-24 px-6 overflow-y-auto h-full">
                    {selectedIndex === 1 ? (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Booking Requests</h2>
                            <button className="bg-green-700 rounded-md py-2 px-3 text-white font-semibold mb-5" onClick={() => handleSaveChanges()}>
                                Save Changes
                            </button>
                            {requests.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {requests.map((request) => request.status == "Pending" && (
                                        <div key={request._id} className="bg-white p-4 rounded-lg shadow-md">
                                            <p className="text-black font-semibold text-lg mb-4">{request.hallName}</p>
                                            <p className="text-gray-600 mb-2">User: {request.user}</p>
                                            <p className="text-gray-600 mb-2">Date: {new Date(request.bookingDate).toLocaleDateString()}</p>
                                            <p className="text-gray-600 mb-2">Start Time: {new Date(request.startTime).toLocaleTimeString()}</p>
                                            <p className="text-gray-600 mb-2">End Time: {new Date(request.endTime).toLocaleTimeString()}</p>
                                            <div className="flex justify-between">
                                                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={() => handleApprove(request._id)}>
                                                    Approve
                                                </button>
                                                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => handleReject(request._id)}>
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No booking requests available.</p>
                            )}
                        </div>
                    ) : (
                        <AdminDashBoard bookingData={requests} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
