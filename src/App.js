// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './pages/welcome';
import Register from './pages/register';
import Login from './pages/login';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </Router>
    
  );
};

export default App;
