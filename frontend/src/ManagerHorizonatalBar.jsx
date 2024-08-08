import React from 'react';
import { useNavigate } from 'react-router-dom';

function ManagerHorizontalBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="bg-blue-500 p-4 pl-8 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold  pl-20">Manager Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  );
}

export default ManagerHorizontalBar;
