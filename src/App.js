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
import Home from './pages/home';
import Record from './pages/record';

const App = () => {
  return (
    <div> {/* Aplica el fondo aquí */}
      <Router>
        <>
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
            <Route path="/home" element={<Home />} />
            <Route path="/record" element={<Record />} />

            {/*<Route path="/afterlogin" element={<AfterLogin />} />*/}
            {/*<Route path="/panic" element={<ExcelPage />} />*/}
          </Routes>
        </>
      </Router>
    </div>
  );
};

export default App;

