import {replace, useNavigate} from 'react-router';
const DashBoardCard = ({ image, name, capacity, shortDescription, longDescription}) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(`/booking/${name.toString().toLowerCase().split(' ').join('-')}`, {
            replace: true,
            state: {
                image, name, capacity, shortDescription, longDescription
            }
        })
    }
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-smei">{name}</h2>
            <p className='text-md font-semibold mb-2 font-smei'>{shortDescription}</p>
            <p className="text-gray-600 mb-3 text-lg font-smei">
                Max Capacity: <span className="font-medium">{capacity}</span>
            </p>
            <button onClick={() => navigate(`/booking/${name.toString().toLowerCase().split(' ').join('-')}`)} className="bg-blue-500 text-white text-md font-bold rounded-md px-3 py-1.5">
                Book Now
            </button>
        </div>
    );
};

export default DashBoardCard;
