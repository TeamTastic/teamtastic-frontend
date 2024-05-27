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
import Logout from "./components/logout";
import Information from './pages/Information';
// import AfterLogin from './pages/afterLogin';
// import ExcelPage from './pages/panic';

const App = () => {
  return (
    <Router>
      <>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privateRoute" element={<PrivateRoute />} />
          <Route path="/template" element={<Template />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/download" element={<Download />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Information" element={<Information />} />

          {/*<Route path="/afterlogin" element={<AfterLogin />} />*/}
          {/*<Route path="/panic" element={<ExcelPage />} />*/}
        </Routes>
      </>
    </Router>
  );
};

export default App;
