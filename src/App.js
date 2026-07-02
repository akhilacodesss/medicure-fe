import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import DoctorLayout from './layouts/DoctorLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Splash from './pages/public/Splash';
import GetStarted from './pages/public/GetStarted';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import NotFound from './pages/public/NotFound';

import Home from './pages/patient/Home';
import DoctorListing from './pages/patient/DoctorListing';
import DoctorProfile from './pages/patient/DoctorProfile';
import MyAppointments from './pages/patient/MyAppointments';
import PatientProfile from './pages/patient/PatientProfile';

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorSlots from './pages/doctor/DoctorSlots';
import DoctorProfileEdit from './pages/doctor/DoctorProfileEdit';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManagePatients from './pages/admin/ManagePatients';
import ManageAppointments from './pages/admin/ManageAppointments';

export default function App() {
  return (
    <Routes>
      {/* Public standalone pages */}
      <Route path="/splash" element={<Splash />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main app (with navbar/footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorListing />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute roles={['patient']}>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={['patient']}>
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        {/* Doctor area */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute roles={['doctor']}>
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="slots" element={<DoctorSlots />} />
          <Route path="profile" element={<DoctorProfileEdit />} />
        </Route>

        {/* Admin area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="patients" element={<ManagePatients />} />
          <Route path="appointments" element={<ManageAppointments />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      
      </Route>
      
    </Routes>
  );
}

