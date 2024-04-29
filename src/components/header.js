import React, { useState } from 'react';
import DrawerButton from './drawerButton';
import DrawerContent from './drawerContent';
import './Header.css'; // Importa los estilos del encabezado

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <header>
            <nav>
                <ul className="nav-menu">
                    {/* Otros elementos del menú */}
                </ul>
            </nav>
            <DrawerButton isOpen={isDrawerOpen} onClick={toggleDrawer} />
            <DrawerContent isOpen={isDrawerOpen} />
        </header>
    );
};

export default Header;
