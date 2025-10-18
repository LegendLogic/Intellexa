import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import AddSponsors from './pages/Admin/AddSponsors';
import AddEvent from './pages/Admin/AddEvent';
import EventList from './pages/Admin/EventList';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-50 min-h-screen">{children}</main>
    </div>
  </>
);

const App = () => {
  const aToken = localStorage.getItem('aToken');

  return (
    <div className="bg-white min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />

        {aToken ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route
              path="/dashboard"
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />

            <Route
              path="/add-event"
              element={
                <AdminLayout>
                  <AddEvent />
                </AdminLayout>
              }
            />

            <Route
              path="/event-list"
              element={
                <AdminLayout>
                  <EventList />
                </AdminLayout>
              }
            />

            <Route
              path="/add-sponsors"
              element={
                <AdminLayout>
                  <AddSponsors />
                </AdminLayout>
              }
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
