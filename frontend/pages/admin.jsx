import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from 'sonner'
const AdminPanel = () => {
    const menu_links = ["Dashboard", "Requests"];
    const menu_symbols = [<MdDashboard />, <FaClock />];
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [requests, setRequests] = useState([]);
    const [confirmationIds, setConfirmationIds] = useState([]);
    const [rejectionIds, setRejectionIds] = useState([]);
    useEffect(() => {
        const handleUnload = () => {
            console.log('Unloading...');
        };
    
        window.addEventListener('unload', handleUnload);
        
        fetch("http://localhost:3000/api/v1/getAllBookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if(response.success) {
                    setRequests(response.data)
                } else {
                    toast.error(response.message);
                }
            });
            return () => {
                window.removeEventListener('unload', handleUnload);
            };
    }, []);
    const handleApprove = (id) => {
        setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== id)
        );
        console.log(`Request with ID ${id} approved.`);
    };

    const handleReject = (id) => {
        setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== id)
        );
        console.log(`Request with ID ${id} rejected.`);
    };

    return (
        <div className="h-screen flex">
            <div className="bg-white h-full w-64 fixed top-0 left-0 z-20">
                <img src="/nit_logo.svg" className="h-32 w-32 m-auto mt-3" alt="NIT Logo" />
                <ul className="p-4">
                    {menu_links.map((link, index) => (
                        <li
                            key={index}
                            className={`flex items-center gap-3 rounded-md p-4 hover:bg-blue-300 hover:duration-500 ${
                                selectedIndex === index ? "bg-blue-300" : ""
                            }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {menu_symbols[index]} {link}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-100 flex-1 h-screen ml-64">
                <div className="fixed top-0 left-64 h-20 bg-white w-full shadow-md z-10 flex items-center px-3">
                    <h1 className="text-black text-2xl font-bold">Admin Panel</h1>
                </div>

                <div className="pt-24 px-6 overflow-y-auto h-full">
                    {selectedIndex === 1 ? (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Booking Requests</h2>
                            {requests.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {requests.map((request) => (
                                        <div
                                            key={request.id}
                                            className="bg-white p-4 rounded-lg shadow-md"
                                        >
                                            <h3 className="text-lg font-semibold mb-2">
                                                {request.name}
                                            </h3>
                                            <p className="text-gray-600 mb-2">
                                                Date: {request.date}
                                            </p>
                                            <p className="text-gray-600 mb-2">
                                                Time: {request.time}
                                            </p>
                                            <p className="text-gray-600 mb-4">
                                                Capacity: {request.capacity}
                                            </p>
                                            <div className="flex justify-between">
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                                    onClick={() => handleApprove(request.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                    onClick={() => handleReject(request.id)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">
                                    No booking requests available.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-xl font-bold">Welcome to the Admin Panel</h2>
                            <p className="text-gray-600 mt-4">
                                Select a menu option to get started.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
