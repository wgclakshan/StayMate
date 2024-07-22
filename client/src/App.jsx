import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Header from './components/common/Header';

import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import GuestRoutes from './routes/GuestRoutes';
import HostRoutes from './routes/HostRoutes';
// import TenantRoutes from './routes/TenantRoutes';
import TechnicianRoutes from './routes/TechnicianRoutes';
import UserRoutes from './routes/UserRoutes';

import HomePage from './pages/common/HomePage';
import NotFoundPage from './pages/common/NotFoundPage';
import Unauthorized from './pages/common/Unauthorized';



function App() {
  return (
    <div id="stuff">
      <Header />
      
        <Navbar />
        
        <div className="main-content" style={{ paddingTop: '5rem', marginLeft: '16rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/user/*" element={<GuestRoutes />} />
            <Route path="/host/*" element={<HostRoutes />} />
            <Route path="/technician/*" element={<TechnicianRoutes />} />
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/Unauthorized" element={<Unauthorized />} />

            {/* to every user */}
            <Route path="/users/*" element={<UserRoutes />} />
          </Routes>
        </div>
       
    </div>
  );
}

export default App;
