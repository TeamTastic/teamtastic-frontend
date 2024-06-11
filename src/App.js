import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import Register from './pages/register';
import Login from './pages/login';
import Logout from "./components/logout";
import PrivateRoute from './pages/privateRoute';
import Upload from './pages/upload';
import Download from './pages/download';
import Teams from './pages/teams';
import Organizations from './pages/organizations';
import Home from './pages/home';
import Record from './pages/record';

const App = () => {
  return (
    <div>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/privateRoute" element={<PrivateRoute />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/download" element={<Download />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/home" element={<Home />} />
            <Route path="/record" element={<Record />} />
            <Route path="/organizations" element={<Organizations />} />
          </Routes>
        </>
      </Router>
    </div>
  );
};

export default App;

