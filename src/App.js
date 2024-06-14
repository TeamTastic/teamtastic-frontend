import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import Register from './pages/register';
import Login from './pages/login';
import Logout from "./components/logout";
import Upload from './pages/upload';
import Download from './pages/download';
import Teams from './pages/teams';
import Organizations from './pages/organizations';
import Home from './pages/home';
import Record from './pages/record';
import { OrganizationsProvider } from './contexts/OrganizationsContext';
import ProtectedRoute from './components/protected-routes';

const App = () => {
  return (
    <OrganizationsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upload" element={<ProtectedRoute element={<Upload />} />} />
          <Route path="/download" element={<ProtectedRoute element={<Download />} />} />
          <Route path="/teams" element={<ProtectedRoute element={<Teams />} />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/record" element={<ProtectedRoute element={<Record />} />} />
          <Route path="/organizations" element={<Organizations />} />
        </Routes>
      </Router>
    </OrganizationsProvider>
  );
};

export default App;
