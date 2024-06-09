import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/pages/download.css";
import Add from '../assets/add.svg';
import generateTemplate from '../components/generateTemplate';
import { useNavigate } from 'react-router-dom';
import PopUp from '../pages/PopUp';
import starIcon from "../assets/info-icons/star-icon.svg";
import MoreInfo from "../components/moreInfo";
import Header from "../components/header";
import withAuthorization from "../components/withAuthorization";

function Download() {
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState([{ header: 'Nombre' }]);
  const [selectedOption, setSelectedOption] = useState('Rango numérico');
  const [additionalInputValue, setAdditionalInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const SwitchButton = ({ value, onChange, options }) => {
    return (
      <div className="switch-button-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`switch-button ${value === option ? 'active' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };  

  const getAttributeTitle = (index) => {
    const titles = [
      'Atributo 1',
      'Atributo 2',
      'Atributo 3',
      'Atributo 4',
      'Atributo 5'
    ];
    return titles[index];
  };

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

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleAdditionalInputChange(event) {
    setAdditionalInputValue(event.target.value);
  }

  function handleAddSkill() {
    if (skills.length - 1 >= 5) {
      toast.error('Ya has ingresado 5 habilidades');
      return;
    }

    const trimmedSkill = inputValue.trim();

    if (!trimmedSkill) {
      toast.error('Por favor, ingresa un atributo');
      return;
    }

    if (skills.map(skill => skill.header.toLowerCase()).includes(trimmedSkill.toLowerCase())) {
      toast.error('Este atributo ya ha sido ingresado');
      return;
    }

    if (selectedOption === 'Lista de Opciones' && options.length < 3) {
      toast.error('Se requiere un mínimo de 3 opciones para "Lista de Opciones"');
      return;
    }

    let newSkill;

    if (selectedOption === 'Lista de Opciones') {
      newSkill = {
        header: trimmedSkill,
        opciones: options
      };
    } else if (selectedOption === 'Rango numérico') {
      const numericOptions = Array.from({ length: 50 }, (_, index) => index + 1);
      newSkill = {
        header: trimmedSkill,
        opciones: numericOptions
      };
    }

    setSkills([...skills, newSkill]);
    setInputValue('');
    setOptions([]);
    setCurrentStep(currentStep + 1);
  }

  function handleAddOption() {
    const trimmedOption = additionalInputValue.trim().toLowerCase();

    if (!trimmedOption) {
      toast.error('Por favor, ingresa una opción');
      return;
    }

    if (options.map(option => option.toLowerCase()).includes(trimmedOption)) {
      toast.error('Esta opción ya ha sido ingresada');
      return;
    }

    setOptions([...options, trimmedOption]);
    setAdditionalInputValue('');
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && selectedOption === 'Lista de Opciones') {
      handleAddOption();
    }
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  function handleContinue() {
    navigate('/upload');
    setShowPopup(false);
  }

  
  if (currentStep === 0) {
    return (
      <div className="download-container">
        <Header />
        <MoreInfo>
          <div className='info-container'>
            <div className='info-header'>
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
        <div className='download-header'>
          <h1> &#9312; Ingrese hasta 5 habilidades</h1>
        </div>
        <button
          className="startButton"
          onClick={() => setCurrentStep(1)}
        >
          Comenzar
        </button>
        <ToastContainer />
      </div>
    );
  } else {
    return (
    <div className="download-container">
      <Header />
      <ToastContainer />
      {skills.length - 1 < 5 && (
        <div className='addBox'>
          <div className="inputBox">
            <h2>{getAttributeTitle(skills.length - 1)}</h2>
            <input
              className="textInput"
              type="text"
              name=""
              placeholder={`Nuevo atributo ${skills.length}`}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <div className="additionalInput">
              <SwitchButton
                value={selectedOption}
                onChange={(newValue) => {
                  setSelectedOption(newValue);
                  setOptions([]);
                }}
                options={['Lista de Opciones', 'Rango numérico']}
              />
            </div>
            {selectedOption === 'Lista de Opciones' && (
              <div className='optionsBox'>
                <div className="options-input-group">
                  <input
                    className="optionsInput"
                    type="text"
                    name=""
                    placeholder="Agregue nueva opción"
                    value={additionalInputValue}
                    onChange={handleAdditionalInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="addButton roundButton" 
                    onClick={handleAddOption}
                  >
                    <div className="add-hability-svg-container">
                      <img src={Add} alt="Add Icon" />
                    </div>
                  </button>
                </div>
                {options.length > 0 && (
                  <div className="options-list">
                    <h2>Opciones ingresadas:</h2>
                    <ul className="options-added-list">
                      {options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="actions">
        {skills.length > 1 && ( 
          <div className="skills-list">
            <h2>Atributos ingresados:</h2>
            <ul className="skills-added-list">
              {skills.slice(1).map((skill, index) => (
                <li key={index}>
                  <p>{skill.header}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="buttons-row">
        {skills.length - 1 < 5 && (
          <button className="addAnotherButton" onClick={handleAddSkill}>Agregar atributo</button>
        )}
          <button className="downloadButton" onClick={handleDownload}>Descargar Template</button>
        </div>
      </div>
      {showPopup && <PopUp onClose={handleClosePopup} onContinue={handleContinue} />}
    </div>
  );
}
}

export default withAuthorization(Download);