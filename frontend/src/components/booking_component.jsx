import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { toast } from "sonner";

const BookingComponent = ({
    image,
    name,
    capacity,
    longDescription,
    availableDates,
}) => {
    const [value, onChange] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState("");  
    const [selectedEndTime, setSelectedEndTime] = useState("");       

    const isAvailable = (date) => {
        const formattedDate = date.toISOString().split("T")[0];  
        return availableDates?.includes(formattedDate); 
    };

    const handleSelectStartTime = (event) => {
        setSelectedStartTime(event.target.value);
    };

    const handleSelectEndTime = (event) => {
        setSelectedEndTime(event.target.value);
    };

    const handleConfirmation = () => {
        const startingTime = Date.parse(
            `${new Date().toISOString().split("T")[0]}T${selectedStartTime}`
        );
        const endingTime = Date.parse(
            `${new Date().toISOString().split("T")[0]}T${selectedEndTime}`
        );

        if (startingTime >= endingTime) {
            toast.error("Start time should be earlier than end time");
            return;
        }

        toast.success("Booking confirmed");
    };

    return (
        <div className="overflow-auto h-full">
            {/* Hall Information */}
            <div className="w-[95%] mx-auto mt-5 bg-white shadow-lg flex flex-col md:flex-row p-2 md:p-6 rounded-md">
                <img
                    src={image}
                    className="object-cover h-36 md:h-44 rounded-md"
                    alt="Hall"
                />
                <div className="px-2 md:px-5">
                    <h1 className="text-xl md:text-4xl font-bold mb-4">{name}</h1>
                    <p className="text-sm md:text-xl font-semibold mb-4">
                        {longDescription}
                    </p>
                    <p className="text-sm md:text-xl font-semibold text-slate-700">
                        Max Capacity: <span className="text-black">{capacity}</span>
                    </p>
                </div>
            </div>

            <div className="schedule-container mx-auto p-2 md:p-5 mt-5 w-[95%] rounded-lg bg-white shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Select Date and Time
                </h2>
                <Calendar
                    value={value}
                    onChange={onChange}
                    className="react-calendar-custom"
                    tileClassName={({ date }) =>
                        isAvailable(date) ? "available-date" : ""
                    }
                    minDate={new Date()}
                />

                <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="start-time" className="block font-semibold">
                            Start Time
                        </label>
                        <select
                            id="start-time"
                            value={selectedStartTime}
                            onChange={handleSelectStartTime}
                            className="mt-2 p-2 border rounded-md w-full"
                        >
                            <option value="">Select Start Time</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="1:00 PM">1:00 PM</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="end-time" className="block font-semibold">
                            End Time
                        </label>
                        <select
                            id="end-time"
                            value={selectedEndTime}
                            onChange={handleSelectEndTime}
                            className="mt-2 p-2 border rounded-md w-full"
                        >
                            <option value="">Select End Time</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="1:00 PM">1:00 PM</option>
                            <option value="2:00 PM">2:00 PM</option>
                        </select>
                    </div>
                </div>

                <button
                    className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
                    onClick={handleConfirmation}
                >
                    Confirm
                </button>
            </div>

            <style jsx>{`
                .react-calendar-custom {
                    border-radius: 0.5rem;
                    font-family: "Arial", sans-serif;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    width: 100%;
                }

                .available-date {
                    background-color: #4caf50;
                    color: white;
                    font-weight: bold;
                }

                .available-date:hover {
                    background-color: #45a049;
                }
            `}</style>
        </div>
    );
};

export default BookingComponent;
