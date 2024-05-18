import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://teamtastic-back-z244p.ondigitalocean.app/',
  withCredentials: true,// Reemplaza con la URL base de tu backend
  // Otras opciones de configuración de Axios si las necesitas
});

export default instance;
