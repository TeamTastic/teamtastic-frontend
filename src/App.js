// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './pages/welcome';
import Register from './pages/register';
import Login from './pages/login';
import PrivateRoute from './pages/privateRoute';
import Template from './pages/template';
import AfterLogin from './pages/AfterLogin';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privateRoute" element={<PrivateRoute />} />
            <Route path="/template" element={<Template />} />
            <Route path="/afterlogin" element={<AfterLogin />} />
          </Routes>
      </div>
    </Router>
    
  );
};

export default App;
