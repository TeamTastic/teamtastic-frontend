import React, {useEffect} from 'react'; // Importa la librería React
import { useNavigate, Link } from 'react-router-dom'; // Importa los hooks useNavigate y Link de react-router-dom
import '../styles/pages/welcome.css'; // Importa los estilos CSS
import portada from '../assets/portada.png';
import axios from "../axiosConfig"; // Importa la imagen de la portada

function Welcome() { // Define el componente funcional Welcome


  const navigate = useNavigate(); // Obtiene la función navigate del hook useNavigate

  useEffect(() => {
    axios.get('/private_route')
        .then(() => {
          navigate('/privateRoute')
        })
        .catch(error => {
        })
  }, [navigate]);
  const handleRegisterClick = () => { // Define la función handleRegisterClick
    navigate('/register'); // Navega hacia la ruta /register al hacer clic en el botón de registro
  };

  return ( // Retorna el JSX del componente Welcome
    <div className='container'>
      <div className="welcome-container"> {/* Contenedor principal con clase welcome-container */}
        <div className="welcome-content"> {/* Contenido con clase welcome-content */}
          <img src={portada} alt="Portada Teamtastic" className="welcome-image" /> {/* Imagen de portada con clase welcome-image */}
          <h2 className="welcome-h2">¡Bienvenido!</h2> {/* Título h2 con clase welcome-h2 */}
          <h3 className="welcome-h3">Arma tus equipos</h3> {/* Subtítulo h3 con clase welcome-h3 */}
          <div className="input-container"></div> {/* Contenedor de entrada de datos */}
          <button className="welcome-button" onClick={handleRegisterClick}> {/* Botón de registro con clase welcome-button y evento onClick */}
            Registrarse {/* Texto del botón */}
          </button>
          <p className="welcome-signup"> {/* Párrafo de registro con clase welcome-signup */}
            ¿Ya tienes una cuenta? {' '} {/* Texto de pregunta */}
            <Link to="/login" className="welcome-link">Inicia sesión</Link> {/* Enlace de inicio de sesión con clase welcome-link */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome; // Exporta el componente Welcome por defecto
