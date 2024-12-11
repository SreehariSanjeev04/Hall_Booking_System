import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import AdminDashBoard from "../src/components/admin_dashboard";
const AdminPanel = () => {
    const menu_links = ["Dashboard", "Requests"];
    const menu_symbols = [<MdDashboard />, <FaClock />];
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [requests, setRequests] = useState([]);
    const [confirmationIds, setConfirmationIds] = useState([]);
    const [rejectionIds, setRejectionIds] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/getAllBookings", {
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

    const handleBeforeUnload = (e) => {
        e.preventDefault();
        localStorage.setItem("confirmationIds", JSON.stringify(confirmationIds));
        localStorage.setItem("rejectionIds", JSON.stringify(rejectionIds));
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [confirmationIds, rejectionIds]);

    useEffect(() => {
        const savedConfirmationIds = JSON.parse(localStorage.getItem("confirmationIds")) || [];
        const savedRejectionIds = JSON.parse(localStorage.getItem("rejectionIds")) || [];
        if (savedConfirmationIds.length > 0 || savedRejectionIds.length > 0) {
            handleBookingActions(savedConfirmationIds, savedRejectionIds);
            localStorage.removeItem("confirmationIds");
            localStorage.removeItem("rejectionIds");
        }
    }, []);

    const handleBookingActions = async (confirmationIds, rejectionIds) => {
        try {
            if (confirmationIds.length > 0) {
                const firstBatch = await fetch("http://localhost:3000/api/v1/confirmBooking", {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ ids: confirmationIds }),
                });
                const firstBatchData = await firstBatch.json();
                console.log("Confirm Booking Response:", firstBatchData);
            }

            if (rejectionIds.length > 0) {
                const secondBatch = await fetch("http://localhost:3000/api/v1/removeBooking", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ ids: rejectionIds }),
                });
                const secondBatchData = await secondBatch.json();
                console.log("Remove Booking Response:", secondBatchData);
            }
        } catch (error) {
            console.error("Error processing bookings:", error);
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
                <div className="fixed top-0 left-20 md:left-64 h-20 bg-white w-full shadow-md z-10 flex items-center px-3">
                    <h1 className="text-black text-2xl font-bold">Admin Panel</h1>
                </div>

                <div className="pt-24 px-6 overflow-y-auto h-full">
                    {selectedIndex === 1 ? (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Booking Requests</h2>
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
