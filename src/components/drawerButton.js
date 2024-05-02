import React from 'react';
import './drawerButton.css';

const DrawerButton = ({ isOpen, onClick }) => {
    return (
        <React.Fragment>
            <input type="checkbox" id="drawerCheckbox" checked={isOpen} onChange={onClick} />
            <label htmlFor="drawerCheckbox" className="drawer-toggle">
                <div className="drawer-bars" id="drawer-bar1"></div>
                <div className="drawer-bars" id="drawer-bar2"></div>
                <div className="drawer-bars" id="drawer-bar3"></div>
            </label>
        </React.Fragment>
    );
}

export default DrawerButton;
