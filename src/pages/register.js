import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import portada from '../assets/portada.png';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    axios.get('/private_route')
      .then(() => {
        navigate('/home');
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
      });
  }, [navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsRegistering(true);

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setIsRegistering(false);
      return;
    }

    try {
      await axios.post('/user/signup', { name, surname, username,  email, password });
      toast.success('Registro exitoso. Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      const errorMessage = error.response?.data?.error || 'Error al registrar usuario';
      toast.error(errorMessage);
    }
    setIsRegistering(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <img src={portada} alt="Portada Teamtastic" className="register-image" />
        <p className="register-title">Registro</p>
        <p className="register-message">Registrate para obtener acceso completo a nuestro sitio web.</p>
        <div className="register-flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="register-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>Nombre</span>
          </label>
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="register-input"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <span>Apellido</span>
          </label>
        </div>
        <label>
          <input
            required
            placeholder=""
            type="text"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Nombre de Usuario</span>
        </label>
        <label className="register-password-label">
          <input
            required
            placeholder=""
            type={showPassword ? 'text' : 'password'}
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Contraseña</span>
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="register-icon"
            onClick={toggleShowPassword}
          />
        </label>
        <label className="register-password-label">
          <input
            required
            placeholder=""
            type={showConfirmPassword ? 'text' : 'password'}
            className="register-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>Confirma contraseña</span>
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            className="register-icon"
            onClick={toggleShowConfirmPassword}
          />
        </label>
        <button className="register-submit" type="submit" disabled={isRegistering}>Enviar</button>
        <p className="register-signin">¿Ya tienes una cuenta? <Link to="/login">Inicio de Sesión</Link></p>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Register;
