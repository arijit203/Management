import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Sample data initialization (you can replace it with your actual data fetch logic)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual data fetch logic
                const response = await fetch('https://api.example.com/data');
                const data = await response.json();
                setData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle filtering based on search input
    const filterData = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = data.filter(item =>
            item.deviceId.toLowerCase().includes(searchTerm) ||
            item.grainCount.toLowerCase().includes(searchTerm) ||
            item.averageLength.toLowerCase().includes(searchTerm) ||
            item.averageBreadth.toLowerCase().includes(searchTerm) ||
            item.averageLB.toLowerCase().includes(searchTerm) ||
            item.brokenRice.toLowerCase().includes(searchTerm) ||
            item.observation.toLowerCase().includes(searchTerm) ||
            item.gobindobhogLength.toLowerCase().includes(searchTerm) ||
            item.gobindobhogBreadth.toLowerCase().includes(searchTerm) ||
            item.gobindobhogLB.toLowerCase().includes(searchTerm) ||
            item.tulaipanjiLength.toLowerCase().includes(searchTerm) ||
            item.tulaipanjiBreadth.toLowerCase().includes(searchTerm) ||
            item.tulaipanjiLB.toLowerCase().includes(searchTerm)
        );
        setFilteredData(filtered);
    };

    // Function to handle sorting of table columns
    const sortTable = (columnIndex) => {
        const key = [
            'deviceId',
            'grainCount',
            'averageLength',
            'averageBreadth',
            'averageLB',
            'brokenRice',
            'observation',
            'gobindobhogLength',
            'gobindobhogBreadth',
            'gobindobhogLB',
            'tulaipanjiLength',
            'tulaipanjiBreadth',
            'tulaipanjiLB'
        ][columnIndex];
        
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return -sortOrder;
            if (a[key] > b[key]) return sortOrder;
            return 0;
        });
        
        setFilteredData(sortedData);
        setSortOrder(-sortOrder);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Keep initial state true
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

    return (
        <>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="home">
            <header className="header p-4 text-center text-2xl font-bold">
                DATA COLLECTED BY STAFF
            </header>
            <main className="flex-grow w-full p-4 flex flex-col items-center">
                <div className="overflow-x-auto card bg-white p-6 w-full max-w-6xl">
                    <div className="mb-4 w-full">
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search..."
                                className="w-full p-2 border rounded-lg pl-10"
                                onKeyUp={filterData}
                            />
                            <svg
                                className="w-5 h-5 text-gray-500 absolute left-3 top-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-4.35-4.35m1.6-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-pink-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => sortTable(0)}>Device ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => sortTable(1)}>Grain Count</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => sortTable(2)}>Average Length</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => sortTable(3)}>Average Breadth</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => sortTable(4)}>Average L/B Ratio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => sortTable(5)}>Broken Rice</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => sortTable(6)}>Observation</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => sortTable(7)}>Gobindobhog Length</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => sortTable(8)}>Gobindobhog Breadth</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => sortTable(9)}>Gobindobhog L/B</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => sortTable(10)}>Tulaipanji Length</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => sortTable(11)}>Tulaipanji Breadth</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => sortTable(12)}>Tulaipanji L/B</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="data-table" className="bg-white divide-y divide-gray-200">
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.deviceId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.grainCount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.averageLength}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.averageBreadth}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.averageLB}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.brokenRice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.observation}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.gobindobhogLength}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.gobindobhogBreadth}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.gobindobhogLB}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.tulaipanjiLength}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.tulaipanjiBreadth}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.tulaipanjiLB}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={item.image} alt="Item Image" className="w-12 h-12 rounded-full" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Edit
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-gray-600 bg-yellow-100 p-2 rounded-lg">
                        <button
                            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${currentPage === 1 && 'opacity-50'}`}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="text-gray-800">{`Page ${currentPage}`}</span>
                        <button
                            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${currentItems.length < itemsPerPage && 'opacity-50'}`}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentItems.length < itemsPerPage}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </section>
        </>
    );
};

export default DataTable;
