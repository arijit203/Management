import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginForm from './LoginForm';
import ManagerDashboard from './ManagerDashboard';
import UserDashboard from './field_Staff/UserDashboard';
import DataTable from './DataTable';
import FormDetails from './field_Staff/FormDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        

        <Route element={<PrivateRoute allowedRoles={['Manager', 'Admin']} />}>
          <Route path="/manager_dashboard" element={<ManagerDashboard />} />
          <Route path="/dataTable" element={<DataTable />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['Field Staff']} />}>
          <Route path="/user_dashboard" element={<UserDashboard />} />
          <Route path="/formDetails" element={<FormDetails />} />

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
