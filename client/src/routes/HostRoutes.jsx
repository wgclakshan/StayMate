import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

import { PropertyProvider } from '../context/PropertyContext';

import HostPage from '../pages/host/HostPage';
import HostListings from '../pages/host/HostListings';
import AddProperty from '../pages/host/AddProperty';
import AddSection from '../pages/host/AddSection';
import AddLocation from '../pages/host/AddLocation';
import Dashboard from '../pages/host/Dashboard';
import HostFeedback from '../pages/host/HostFeedback';


import PropertyDetails from '../pages/host/PropertyDetails';

function HostRoutes() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <PropertyProvider>
      <Routes>
        <Route path="/property-details/:id" element={currentUser && currentUser.role === 'host' ? <PropertyDetails /> : <Navigate to="/Unauthorized" />} />
        <Route path="/" element={currentUser && currentUser.role === 'host' ? <HostPage /> : <Navigate to="/Unauthorized" />} />
        <Route path="/listings" element={currentUser && currentUser.role === 'host' ? <HostListings /> : <Navigate to="/Unauthorized" />} />
        <Route path="/add-property" element={currentUser && currentUser.role === 'host' ? <AddProperty /> : <Navigate to="/Unauthorized" />} />
        <Route path="/add-section" element={currentUser && currentUser.role === 'host' ? <AddSection /> : <Navigate to="/Unauthorized" />} />
        <Route path="/add-location" element={currentUser && currentUser.role === 'host' ? <AddLocation /> : <Navigate to="/Unauthorized" />} />
        <Route path="/dashboard" element={currentUser && currentUser.role === 'host' ? <Dashboard /> : <Navigate to="/Unauthorized" />} />
        <Route path="/host-feedback" element={currentUser && currentUser.role === 'host' ? <HostFeedback /> : <Navigate to="/Unauthorized" />} />
         
         
          
      </Routes>
    </PropertyProvider>
  );
}

export default HostRoutes;

