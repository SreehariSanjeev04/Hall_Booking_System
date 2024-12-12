import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useState, useContext } from "react";
import DashBoardGrid from "../src/components/dashboard_grid";
import RecentBookings from "../src/components/recent_bookings";
import { UserContext } from "../src/context/userContext";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import UserBookings from "../src/components/user_bookings";
const DashBoard = () => {
    const {user, setUser, loading} = useContext(UserContext);
    const menu_links = ["Dashboard", "Recent Bookings", "Your Booking Requests"];
    const menu_symbols = [<MdDashboard />, <FaClock />, <FaPhoneAlt />];
    const components = [<DashBoardGrid />, <RecentBookings />, <UserBookings />]
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }
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
                <div>
                    <h1 className="text-black text-md  md:text-2xl font-bold">Hall Booking System</h1>
                    <h3>{user?.rollNumber}</h3>
                </div>
                {
                        !loading ? (
                            user ? <a className="text-black rounded-lg mr-24 md:mr-72 flex items-center group hover:bg-black py-2 px-3 transition-colors duration-300 cursor-pointer">
                            <span className="text-md font-bold mr-2 group-hover:text-white transition-colors duration-300">Logout</span>
                            <CiLogout className="h-7 w-7 group-hover:text-white transition-colors duration-300" onClick={handleLogout} />
                        </a> : <a className="text-black mr-24 md:mr-72 flex items-center group py-2 rounded-lg px-3 hover:bg-black transition-colors duration-300" href="/login" >
                            <span className="text-md font-bold mr-2 group-hover:text-white transition-colors duration-300">Login</span>
                            <CiLogin className="h-7 w-7 group-hover:text-white transition-colors duration-300" />
                        </a>
                        ) : null
                }

            </div>
                    {components[selectedIndex]}
            </div>
        </div>
    );
};

export default DashBoard;
