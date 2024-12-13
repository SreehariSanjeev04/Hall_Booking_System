
import DashBoardCard from "./dashboard_card"
import { useEffect, useState} from 'react'
const DashBoardGrid = () => {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        fetch("/data/dashboard.json")
            .then((response) => response.json())
            .then((response) => {
                setData(response);
                setFilteredData(response);
            });
    }, []);
    const handleSearch = (e) => {
        setSearchText(e.target.value);
        const text = e.target.value;
        setFilteredData(data.filter((item) => item.name.toLowerCase().includes(text)));
    }
    return (
        <div className="pt-24 px-6 overflow-y-auto h-full">
                    <div className="mb-5">
                        <input type="text"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearch}
                        />
                    </div>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
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
    )
}
export default DashBoardGrid;