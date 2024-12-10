
import DashBoardCard from "./dashboard_card"
import { useEffect, useState} from 'react'
const DashBoardGrid = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/data/dashboard.json")
            .then((response) => response.json())
            .then((response) => setData(response));
    }, []);

    return (
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
    )
}
export default DashBoardGrid;