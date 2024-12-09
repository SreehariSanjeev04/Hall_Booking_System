import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import DashBoardCard from "../src/components/dashboard_card";
import { IoMdLogIn } from "react-icons/io";

const DashBoard = () => {
    const isLoggedIn = true;
    const menu_links = ["Dashboard", "Recent Bookings", "Contact", isLoggedIn ? "Logout" : "Login"];
    const menu_symbols = [<MdDashboard />, <FaClock />, <FaPhoneAlt />, <IoMdLogIn />];
    const [data, setData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetch("/data/dashboard.json")
            .then((response) => response.json())
            .then((response) => setData(response));
    }, []);

    return (
        <div className="h-screen flex">
            <div className="bg-white h-full w-20 md:w-64 fixed top-0 left-0 z-20">
                <img src="/nit_logo.svg" className="h-16 md:h-32 m-auto mt-3" alt="NIT Logo" />
                <ul className="p-4">
                    {menu_links.map((link, index) => (
                        <li
                            key={index}
                            className={`flex items-center gap-3 rounded-md p-4 hover:bg-blue-300 hover:duration-500 ${
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

                <div className="pt-24 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto h-full">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <DashBoardCard
                                key={index}
                                image={item.image}
                                name={item.name}
                                capacity={item.capacity}
                                shortDescription={item.shortDescription}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No data available
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
