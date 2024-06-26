import React, {useEffect, useState} from 'react';
import DrawerButton from './drawerButton';
import DrawerContent from './drawerContent';
import '../styles/components/header.css';
import axios from "../axiosConfig";


const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);

    };

    useEffect(() => {
        axios.get('/private_route')
            .then(response => {
                console.log(response.data);
                const match = response.data.match(/Bienvenido (\w+),/);
                setIsAuthenticated(true)
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
        <>
            {isAuthenticated? (
                <header onMouseLeave={toggleDrawer}>
                    <div className='drawer-button'>
                        <DrawerButton isOpen={isDrawerOpen} onClick={toggleDrawer} isAuthenticated={isAuthenticated}/>
                    </div>
                    <nav>
                        <ul className="nav-menu">

                        </ul>
                    </nav>

                    <DrawerContent isOpen={isDrawerOpen} user={user}/>
                </header>
            ) :  null}
        </>
    );
};

export default Header;
