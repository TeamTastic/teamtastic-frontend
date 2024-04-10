import React, { useState } from 'react';
import './Drawer.css';

const Drawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-toggle" onClick={toggleDrawer}>
        <span className="toggle-icon">&#9776;</span>
      </div>
      <div className="drawer-content">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
