import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const withRedirectionIfAuthenticated = (WrappedComponent, redirectPath = '/download') => {
    return function WithRedirectionIfAuthenticated(props) {
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuthentication = async () => {
                try {
                    await axios.get('/private_route');
                    navigate(redirectPath);  // Redirect to the specified path if authenticated
                } catch (error) {
                    setLoading(false);  // User is not authenticated, stop loading
                }
            };

            checkAuthentication();
        }, [navigate, redirectPath]);

        if (loading) {
            return <div>Cargando...</div>;  // Show a loading indicator while checking authentication
        }

        return <WrappedComponent {...props} />;
    };
};

export default withRedirectionIfAuthenticated;
