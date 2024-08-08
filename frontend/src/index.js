import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome CSS
import ToasterContext from './components/ToasterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <ToasterContext/>
    <App />
    </>
    
);
