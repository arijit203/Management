import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Breadcrumb = ({deviceId}) => (
  <nav aria-label="breadcrumb" className="hidden md:flex">
    <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      <li className="inline-flex items-center gap-1.5"></li>
      <li aria-hidden="true" className="[&>svg]:size-3.5" role="presentation">
        <ChevronRightIcon />
      </li>
      <li className="inline-flex items-center gap-1.5">
        <span aria-current="page" aria-disabled="true" className="font-normal text-[#374151]" role="link">
          Device {deviceId}
        </span>
      </li>
    </ol>
  </nav>
);

const ChevronRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-right"
  >
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-2.5 top-2.5 h-4 w-4 text-[#6b7280]"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);
const formatDateTime = (timestamp) => {
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return { date, time };
};

const Table = ({products}) =>{
  const navigate = useNavigate();
   return(
  <div className="relative w-full overflow-auto">
    <table className="w-full caption-bottom text-sm">
      <thead className="[&_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-[#0f0e0e]">
            Location
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-[#0f0e0e]">
            Sample
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-[#0f0e0e]">
            Date
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-[#0f0e0e]">
            Time
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-[#0f0e0e]">
            Action
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
            <span className="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {products.map((product, index) => {
          const { date, time } = formatDateTime(product.date);
          
          return (
            <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-[#374151]">{product.location}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-[#374151]">{product.sample}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-[#374151]">{date}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-[#374151]">{time}</td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
              <button
                className="text-[#3b82f6]"
                onClick={() => navigate(`/formDetails?id=${product.id}`, { state: { product } })}
              >
                View
              </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
}

const UserDashboard = () => {
  const [deviceId, setDeviceId] = useState('');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Function to fetch deviceId from backend
    const fetchDeviceId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/deviceId', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Send JWT token in Authorization header
          }
        });
        
        setDeviceId(response.data.deviceId);
      } catch (error) {
        console.error('Error fetching deviceId:', error);
        // Handle error (show error message, redirect, etc.)
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Send JWT token in Authorization header
          }
        });
        setProducts(response.data);
       
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error (show error message, redirect, etc.)
      }
    };

    fetchProducts();
    fetchDeviceId(); // Call the function when component mounts

  }, []);

  useEffect(() => {
    // Filter products based on searchQuery whenever searchQuery changes
    const filtered = products.filter((product) => {
      // Convert searchQuery to lowercase for case-insensitive comparison
      const query = searchQuery.toLowerCase();
      // Check if product location, sample, or formatted date contains the searchQuery
      return (
        product.location.toLowerCase().includes(query) ||
        product.sample.toLowerCase().includes(query) ||
        formatDateTime(product.date).date.toLowerCase().includes(query)
      );
    });

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fff]">
      <Sidebar />
      <div className="flex flex-1 flex-col mt-10">
        
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-[#ffffff] px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="bg-black text-white py-2 px-4">
            <span>Welcome Field Staff!</span>
          </div>
          <Breadcrumb deviceId={deviceId}/>
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon />
            <input
              className="flex h-10 border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-[#ffffff] pl-8 md:w-[260px] lg:w-[370px]"
              placeholder="Search on basis of Location, Sample or Time..."
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="rounded-lg border text-card-foreground bg-[#ffffff] shadow-md" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-[#374151]">
                Device {deviceId} Submissions {/* Displaying the deviceId here */}
              </h3>
              <p className="text-sm text-[#6b7280]">View and manage the form submissions for this device.</p>
            </div>
            <div className="p-6">
              <Table products={filteredProducts}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};



export default UserDashboard;
