import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { toast } from "react-toastify";

function BlockRoutes() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                await axios.get('/private_route');
                setLoading(false);  // User is authorized, stop loading
            } catch (error) {
                console.error('Error al acceder a la ruta privada:', error);
                toast.error('No tienes permiso para acceder a esta ruta');
                navigate('/login');  // Redirect to login page
            }
        };

        checkAuthorization();
    }, [navigate]);

    if (loading) {
        return <div>Cargando...</div>;  // Show a loading indicator while checking authorization
    }

    return null;  // Render nothing if authorized and loading is complete
}

export default BlockRoutes;
