import React, {useEffect} from "react";
import axios from "../axiosConfig";
import {useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/user/logout')
            .then(() => {
                navigate('/')
            })
            .catch(error => {
                console.error("Error al cerrar sesión:", error);
            })

    }, [navigate]);
    return (
        <>

        </>
    );
}

export default Logout;