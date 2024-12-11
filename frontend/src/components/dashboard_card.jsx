import {replace, useNavigate} from 'react-router';
import { FaArrowRight } from "react-icons/fa";
const DashBoardCard = ({ image, name, capacity, shortDescription, longDescription}) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 shadow-md rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
            {image && (
                <div className="w-full h-40 mb-4 overflow-hidden rounded-md">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <h2 className="text-2xl tracking-tighter font-semibold text-gray-800 mb-2 font-smei">{name}</h2>
            <p className='text-md tracking-tight font-semibold mb-2 font-smei'>{shortDescription}</p>
            <p className="text-gray-600 mb-3 text-lg font-smei">
                Max Capacity: <span className="font-medium">{capacity}</span>
            </p>
            <button onClick={() => navigate(`/booking/${name.toString().toLowerCase().split(' ').join('-')}`)} className="bg-blue-400 flex justify-center items-center text-white text-md font-semibold rounded-md px-3 py-1.5" 
                aria-label='Booking'>
                Book Now <FaArrowRight className='ml-3' />
            </button>
        </div>
    );
};

export default DashBoardCard;
