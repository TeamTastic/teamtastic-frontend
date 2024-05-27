import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages/download.css';
import DownloadTemplateButton from '../components/download-template-button';
import generateTemplate from '../components/generateTemplate';
import starIcon from '../assets/info-icons/star-icon.svg';
import MoreInfo from '../components/moreInfo';
import { useNavigate } from 'react-router-dom';
import PopUp from './PopUp';
import Header from '../components/header';
import AttributeSlider from '../components/attribute-slider';

function Download() {
  const [skills, setSkills] = useState([{ header: 'Nombre' }]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  function handleDownload() {
    try {
      const formattedSkills = skills.map(skill => {
        if (skill.opciones && skill.opciones.length > 0) {
          return { header: skill.header, opciones: skill.opciones };
        } else {
          return { header: skill.header };
        }
      });
      formattedSkills.push({ header: 'No juega con' });
      generateTemplate(formattedSkills);
      setShowPopup(true);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error al descargar el archivo');
    }
  }

  function handleAddAttribute(newAttributes) {
    if (newAttributes.length > 5) {
      toast.error('Ya has ingresado 5 nuevos atributos');
      return;
    }

    const newSkills = newAttributes.map(attr => ({
      header: attr,
      opciones: [], // Puedes ajustar esto según el tipo de opciones que necesites
    }));

    setSkills([{ header: 'Nombre' }, ...newSkills]);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  function handleContinue() {
    navigate('/upload');
    setShowPopup(false);
  }

  return (
    <div className="download-container">
      <MoreInfo>
        <div className="info-container">
          <div className="info-header">
            <img src={starIcon} alt="Star Icon" />
            <h1> ¿Cómo usar? </h1>
          </div>
          <ul>
            <li>Selecciona Habilidades: Elige hasta 5 habilidades esenciales para tus equipos.</li>
            <li>Descarga la Plantilla: Haz clic en "Descargar Template".</li>
            <li>Completa la Plantilla: Llena con nombres de participantes y sus puntuaciones (1 a 99) para las habilidades elegidas.</li>
          </ul>
        </div>
      </MoreInfo>
      <Header />
      <ToastContainer />
      <div className="download-header">
        <h1> &#9312; Ingrese hasta 5 nuevos atributos</h1>
      </div>
      <AttributeSlider onAddAttribute={handleAddAttribute} />
      <DownloadTemplateButton onClick={handleDownload}>Descargar Template</DownloadTemplateButton>
      {showPopup && <PopUp onClose={handleClosePopup} onContinue={handleContinue} />}
    </div>
  );
}

export default Download;
