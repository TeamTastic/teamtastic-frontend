import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';

import Welcome from './pages/welcome';
import Register from './pages/register';
import Login from './pages/login';
import PrivateRoute from './pages/privateRoute';
import Template from './pages/template';
import Upload from './pages/upload';
import Download from './pages/download';
import Teams from './pages/teams';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privateRoute" element={<PrivateRoute />} />
          <Route path="/template" element={<Template />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/download" element={<Download />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
