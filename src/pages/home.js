import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/home.css'; 
import './download';
import './upload'
import './teams'
import Header from '../components/header';
import Logo from '../assets/logo.png';
import Step1Image from '../assets/steps-icons/step1.png';
import Step2Image from '../assets/steps-icons/step2.png';
import Step3Image from '../assets/steps-icons/step3.png';
import Step4Image from '../assets/steps-icons/step4.png';
import withAuthorization from "../components/withAuthorization";

function Home() { 
  const navigate = useNavigate(); 

  const handleStart = () => {
    navigate('/download');
  };

  const handleStepClick = (step) => {
    switch(step) {
      case 1:
      case 2:
        navigate('/download');
        break;
      case 3:
        navigate('/upload');
        break;
      case 4:
        navigate('/teams');
        break;
      default:
        break;
    }
  };

  return (
    <div className="information-body"> 
    <Header />
      <div className="information-main-container">
          <h1 className="information-h1">¡Bienvenido a nuestra plataforma de creación de equipos equitativos!</h1>
      </div>

      <div className="information-steps-container">
        <h2 className="information-h2">Pasos para crear tus equipos</h2>
        <div className="information-steps">
          <div className="information-step" onClick={() => handleStepClick(1)}>
            <img src={Step1Image} alt="Paso 1" className="information-step-image"/>
            <div className="information-step-title">1. Ingreso de Habilidades:</div>
            <p>Aquí podrás definir los atributos que deseas considerar para formar los equipos. Hay dos tipos de atributos:</p>
            <ul>
              <li>Opciones predefinidas.</li>
              <li>Rangos numéricos.</li>
            </ul>
          </div>
          <div className="information-step" onClick={() => handleStepClick(2)}>
          <img src={Step2Image} alt="Paso 2" className="information-step-image"/>
            <div className="information-step-title">2. Descargar Template:</div>
            <p>Haz clic en el botón 'Descargar Template'. Esto descargará un archivo Excel que contiene todo lo necesario para ingresar los datos de los jugadores.</p>
          </div>
          <div className="information-step" onClick={() => handleStepClick(3)}>
          <img src={Step3Image} alt="Paso 3" className="information-step-image"/>
            <div className="information-step-title">3. Carga de Datos:</div>
            <p>Con el archivo Excel completo, regresa a la plataforma y dirígete a la pantalla de 'Carga de Datos'. Aquí, solo tienes que subir el archivo con la información de los jugadores.</p>
          </div>
          <div className="information-step" onClick={() => handleStepClick(4)}>
          <img src={Step4Image} alt="Paso 4" className="information-step-image"/>
            <div className="information-step-title">4. Visualización de Equipos:</div>
            <p>Finalmente, serás dirigido a la pantalla de 'Visualización de Equipos'. Aquí podrás ver cómo se han generado los equipos de forma equitativa, basados en los atributos que ingresaste.</p>
          </div>
        </div>
      </div>

      <div className="information-final-text">
        <p>¡Y eso es todo! Nuestro sistema se encarga del resto para asegurarse de que tus equipos estén equilibrados según las habilidades de cada jugador.</p>
      </div>

      <div className="button-container">
        <button className="information-button" onClick={handleStart}> 
          Comenzar
        </button>
      </div>
    </div>
  );
}

export default withAuthorization(Home);
