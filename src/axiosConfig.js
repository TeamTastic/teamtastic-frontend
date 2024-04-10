import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://oyster-app-4m62c.ondigitalocean.app/',
  withCredentials: true,// Reemplaza con la URL base de tu backend
  // Otras opciones de configuración de Axios si las necesitas
});

export default instance;
