import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const formatDateTime = (timestamp) => {
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return { date, time };
};
const DeviceIdSubmissions = ({product}) => {
  const { date, time } = formatDateTime(product.date);
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6 px-7">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          Device ID Submissions
        </h3>
        <p className="text-sm text-muted-foreground">
          Summarized view of form submissions for the selected Device ID.
        </p>
      </div>
      <div className="p-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Location
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Sample
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{product.location}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{product.sample}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{date}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Observations component
const Observations = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6 px-7">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          Observations
        </h3>
        <p className="text-sm text-muted-foreground">
          Additional observations for the selected Device ID.
        </p>
      </div>
      <div className="p-6">
        <p>The rice sample from Kolkata shows higher grain count and lower broken rice percentage.</p>
        <p>Further analysis is needed to determine the factors contributing to the differences in rice quality.</p>
      </div>
    </div>
  );
};

const FormDetails = () => {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const productId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      // Fetch product details by ID from the backend
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product/${productId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Send JWT token in Authorization header
            }
          });
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      if (productId) {
        fetchProductDetails();
      } else {
        navigate('/dataTable'); // Redirect to dataTable if no product ID is found
      }
    }
  }, [productId, location.state, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  
  
  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar/>
      <div className="flex flex-col w-full mt-12">
        
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
              <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Device ID</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-muted-foreground"
                >
                  <line x1="12" x2="12" y1="17" y2="22"></line>
                  <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                </svg>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold">{product.deviceId}</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
              <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Grain Count</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-muted-foreground"
                >
                  <path d="M22 5V2l-5.89 5.89"></path>
                  <circle cx="16.6" cy="15.89" r="3"></circle>
                  <circle cx="8.11" cy="7.4" r="3"></circle>
                  <circle cx="12.35" cy="11.65" r="3"></circle>
                  <circle cx="13.91" cy="5.85" r="3"></circle>
                  <circle cx="18.15" cy="10.09" r="3"></circle>
                  <circle cx="6.56" cy="13.2" r="3"></circle>
                  <circle cx="10.8" cy="17.44" r="3"></circle>
                  <circle cx="5" cy="19" r="3"></circle>
                </svg>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold">{product.grain_count}</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
              <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Broken Rice %</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-muted-foreground"
                >
                  <line x1="19" x2="5" y1="5" y2="19"></line>
                  <circle cx="6.5" cy="6.5" r="2.5"></circle>
                  <circle cx="17.5" cy="17.5" r="2.5"></circle>
                </svg>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold">{product.broken_rice}%</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6 px-7">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Rice Parameters</h3>
              <p className="text-sm text-muted-foreground">Comparison of rice parameters across different varieties.</p>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Parameters
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Sample
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Gobindobhog
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Tulaipanji
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">Kernel Length</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{product.k_length} mm</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5.8 mm</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">6.1 mm</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">Kernel Breadth</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{product.k_breadth} mm</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2.3 mm</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2.5 mm</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">L/B Ratio</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{product.lb_ratio}</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2.52</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2.44</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <DeviceIdSubmissions product={product}/>
          <div className='mb-5'>
          <Observations />
          </div>
        
        </main>
       
        
      </div>
    </div>
  );
};

export default FormDetails;
