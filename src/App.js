// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './pages/welcome';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import PrivateRoute from './pages/privateRoute';
import Template from './pages/template';
import Upload from './pages/upload';
import Download  from "./pages/download";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privateRoute" element={<PrivateRoute />} />
            <Route path="/template" element={<Template />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/download" element={<Download />} />
          </Routes>
      </div>
    </Router>
    
  );
};

export default App;
