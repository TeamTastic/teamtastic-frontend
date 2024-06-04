import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import {toast} from "react-toastify";
import Header from "./header";

function BlockRoutes() {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/private_route')
            .then(() => setLoading(false))
            .catch(error => {
                console.error('Error al acceder a la ruta privada:', error);
                setLoading(true);
                toast.error('No tienes permiso para acceder a esta ruta');
                navigate('/login')
            })
    }, [navigate]);

    if(loading) {
        return;
    }


    return (
    <>

    </>
  );
}

export default BlockRoutes;