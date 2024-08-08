import React from 'react';
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css'; // Ensure this file contains the necessary CSS

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/'); // Redirect to login page
  };
  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'close'}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="logo.png" alt="Logo" />
          </span>
          <div className="text logo-text">
            <span className="name">Lab</span>
            <span className="profession">INGREENS</span>
          </div>
        </div>
        <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/manager_dashboard">
                <i className='bx bx-home-alt icon'></i>
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/dataTable">
                <i className='bx bx-bar-chart-alt-2 icon'></i>
                <span className="text nav-text">User Data</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/archeivedata">
                <i className='bx bx-bell icon'></i>
                <span className="text nav-text">Archive Users</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/archievedata1">
                <i className='bx bx-pie-chart-alt icon'></i>
                <span className="text nav-text">Archive Data</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
        <li>
        <a onClick={handleLogout}>
              <i id="logoutButton" className='bx bx-log-out icon'></i>
              <span className="text nav-text">Logout</span>
            </a>
        </li>
          <li className="mode">
            <div className="sun-moon">
              <i className='bx bx-moon icon moon'></i>
              <i className='bx bx-sun icon sun'></i>
            </div>
            <span className="mode-text text">Dark mode</span>
            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
