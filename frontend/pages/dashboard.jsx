import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import DashBoardGrid from "../src/components/dashboard_grid";
import RecentBookings from "../src/components/recent_bookings";
const DashBoard = () => {
    const menu_links = ["Dashboard", "Recent Bookings", "Your Booking Requests"];
    const menu_symbols = [<MdDashboard />, <FaClock />, <FaPhoneAlt />];
    const components = [<DashBoardGrid />, <RecentBookings />]
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <div className="h-screen flex">
            <div className="bg-white h-full w-20 md:w-64 fixed top-0 left-0 z-20">
                <img src="/nit_logo.svg" className="h-16 md:h-32 m-auto mt-3" alt="NIT Logo" />
                <ul className="p-4">
                    {menu_links.map((link, index) => (
                        <li
                            key={index}
                            className={`flex font-semibold tracking-tighter mb-2 cursor-pointer items-center gap-3 rounded-md p-4 hover:bg-blue-300 hover:duration-500 ${
                                selectedIndex === index ? "bg-blue-300" : ""
                            }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {menu_symbols[index]} <span className="hidden md:block">{link}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-slate-100 flex-1 h-screen ml-20 md:ml-64">
            <div className="fixed top-0 h-20 bg-white w-full shadow-md z-10 flex justify-between items-center px">
                <h1 className="text-black text-md  md:text-2xl font-bold">Hall Booking System</h1>
                <a className="text-black pr-32 md:pr-72 flex items-center" href="/login">
                    <IoMdLogIn className="mr-2" /> Login
                </a>

            </div>
                    {components[selectedIndex]}
            </div>
        </div>
    );
};

export default DashBoard;
