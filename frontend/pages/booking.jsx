import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import BookingComponent from "../src/components/booking_component";
import { useParams } from "react-router-dom";

const Booking = () => {
    const { hall_name } = useParams();
    const [hallData, setHallData] = useState(null);
    const menu_links = ["Dashboard", "Booking Requests", "Contact"];
    const menu_symbols = [<MdDashboard />, <FaClock />, <FaPhoneAlt />];
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetch("/data/dashboard.json")
            .then((response) => response.json())
            .then((response) => {
                const selectedHall = response.find(
                    (hall) =>
                        hall.name.toLowerCase().split(" ").join("-") === hall_name
                );
                if (selectedHall) {
                    setHallData(selectedHall);
                }
            });
    }, [hall_name]);

    return (
        <div className="h-screen flex">
    {/* Sidebar */}
    <div className="bg-white h-full w-24 md:w-64 fixed top-0 left-0 z-20">
        <img
            src="/nit_logo.svg"
            className="h-16 w-16 md:h-32 md:w-32 m-auto mt-3"
            alt="NIT Logo"
        />
        <ul className="p-4">
            {menu_links.map((link, index) => (
                <li
                    key={index}
                    className={`flex items-center gap-3 rounded-md p-4 hover:bg-blue-300 hover:duration-500 ${
                        selectedIndex === index ? "bg-blue-300" : ""
                    }`}
                    onClick={() => setSelectedIndex(index)}
                >
                    {menu_symbols[index]}{" "}
                    <span className="hidden md:block">{link}</span>
                </li>
            ))}
        </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1 bg-slate-100 h-screen ml-24 md:ml-64">
        {/* Topbar */}
        <div className="fixed top-0 left-24 md:left-64 h-20 bg-white w-full shadow-md z-10 flex items-center px-3">
            <h1 className="text-black text-lg md:text-3xl font-bold">
                Hall Booking System
            </h1>
        </div>

        {/* Scrollable Content */}
        <div className="pt-24 px-4 h-full overflow-y-auto">
            {hallData ? (
                <BookingComponent
                    name={hallData.name}
                    image={hallData.image}
                    capacity={hallData.capacity}
                    longDescription={hallData.longDescription}
                />
            ) : (
                <div>No data found</div>
            )}
        </div>
    </div>
</div>

    );
};

export default Booking;
