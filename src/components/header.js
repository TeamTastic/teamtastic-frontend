import React, {useEffect, useState} from 'react';
import DrawerButton from './drawerButton';
import DrawerContent from './drawerContent';
import '../styles/components/header.css';
import axios from "../axiosConfig";

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('Iniciar Sesión');
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        axios.get('/private_route')
            .then(response => {
                console.log(response.data);
                const match = response.data.match(/Bienvenido (\w+),/);

                if (match && match[1]) {
                    setUser(match[1])
                }

            })
            .catch(error => {
                console.log('Error al acceder a la ruta privada');

            })
    }, []);

    useEffect(() => {

    }, [user]);

    return (
        <header onMouseLeave={toggleDrawer}>
            <div className='drawer-button'>
                <DrawerButton isOpen={isDrawerOpen} onClick={toggleDrawer} />
            </div>

            <nav>
                <ul className="nav-menu">
                    {/* Otros elementos del menú */}
                </ul>
            </nav>

            <DrawerContent isOpen={isDrawerOpen} user={user} />
        </header>
    );
};

export default Header;
