import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import BookingComponent from "../src/components/booking_component";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { IoMdLogIn } from "react-icons/io";
const Booking = () => {
    const [isValid, setIsValid] = useState(false);
    const { hall_name } = useParams();
    const [hallData, setHallData] = useState(null);
    const menu_links = ["Dashboard", "Booking Requests", "Contact"];
    const menu_symbols = [<MdDashboard />, <FaClock />, <FaPhoneAlt />];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleTokenFetch = (token) => {
        fetch("http://localhost:3000/api/v1/checkValidUser", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
        .then(response => {
            if(response.success) setIsValid(true);
            else {
                toast.error("Session expired. Please login again.");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        });
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            toast.error("Session expired. Please login again.");
            window.location.href = "/login";
            return;
        }
        handleTokenFetch(token);
        if(isValid) {
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
        }
    }, [isValid]);

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

    <div className="flex-1 bg-slate-100 h-screen ml-20 md:ml-64">
        <div className="fixed top-0 h-20 bg-white w-full shadow-md z-10 flex justify-between items-center px">
                <h1 className="text-black text-md  md:text-2xl font-bold">Hall Booking System</h1>
                <a className="text-black pr-32 md:pr-72 flex items-center" href="/login">
                    <IoMdLogIn className="mr-2" /> Login
                </a>

            </div>

        {
            isValid && <div className="pt-24 px-4 h-full overflow-y-auto">
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
        }
        
    </div>
</div>

    );
};

export default Booking;
