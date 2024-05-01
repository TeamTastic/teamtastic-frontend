import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/download.css";
import Add from '../assets/add.svg';
import DownloadTemplateButton from '../components/download-template-button';
import SwitchButton from '../components/switchButton';
import generateTemplate from '../components/generateTemplate';

function Download() {
  const [numbers] = Array.from({ length: 100 }, (_, index) => (index + 1));
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Lista de Opciones');
  const [additionalInputValue, setAdditionalInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isHovered, setIsHovered] = useState(false); // Define el estado isHovered
  const [showOptionsInput, setShowOptionsInput] = useState(true); // Nuevo estado para controlar la visibilidad del input de opciones

  useEffect(() => {
    // Limpiar las opciones cuando se cambie la opción seleccionada
    setOptions([]);
    // Mostrar u ocultar el input de opciones basado en la opción seleccionada
    setShowOptionsInput(selectedOption === 'Lista de Opciones');
  }, [selectedOption]);

  function handleDownload() {
    try {
      const formattedSkills = skills.map(skill => {
        if (skill.opciones && skill.opciones.length > 0) {
          return { header: skill.header, opciones: skill.opciones };
        } else {
          return { header: skill.header };
        }
      });
      generateTemplate(formattedSkills);
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
    if (skills.length >= 6) {
      toast.error('Ya has ingresado 5 nuevos atributos');
      return;
    }
  
    const trimmedSkill = inputValue.trim().toLowerCase();
  
    if (!trimmedSkill) {
      toast.error('Por favor, ingresa un atributo');
      return;
    }
  
    if (skills.map(skill => skill.header.toLowerCase()).includes(trimmedSkill)) {
      toast.error('Este atributo ya ha sido ingresado');
      return;
    }
  
    let newSkill;
  
    if (selectedOption === 'Lista de Opciones') {
      newSkill = {
        header: inputValue.trim(),
        opciones: options
      };
    } else if (selectedOption === 'Rango numérico') {
      const numericOptions = Array.from({ length: 100 }, (_, index) => index + 1);
      newSkill = {
        header: inputValue.trim(),
        opciones: numericOptions
      };
    }
  
    setSkills([...skills, newSkill]);
    setInputValue('');
    setOptions([]); // Reiniciar opciones después de agregar una habilidad
    setSelectedOption(''); // Reiniciar la opción seleccionada
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
  
    setOptions([...options, trimmedOption]); // Agregar la nueva opción a las opciones existentes
    setAdditionalInputValue(''); // Limpiar el valor del input
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && selectedOption === 'Lista de Opciones') {
      handleAddOption();
    }
  }

  return (
    <div className="download-container">
      <ToastContainer />
      <div className='download-header'>
        <h1> &#9312; Ingrese hasta 5 nuevos atributos</h1>
      </div>
      <div className="addBox">
        <div className="inputBox">
          <input
            className="textInput"
            type="text"
            name=""
            placeholder="Nuevo atributo"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />

          <div className="additionalInput">
            <p className={`toggleOption ${selectedOption === 'Lista de Opciones' ? 'active' : ''}`} onClick={() => setSelectedOption('Lista de Opciones')}>
              Lista de Opciones
            </p>
            <SwitchButton
              value={selectedOption}
              onChange={(newValue) => {
                setSelectedOption(newValue);
                // Limpiar las opciones si la opción seleccionada cambia
                setOptions([]);
              }}
              options={['Lista de Opciones', 'Rango numérico']}
            />
            <p className={`toggleOption ${selectedOption === 'Rango numérico' ? 'active' : ''}`} onClick={() => setSelectedOption('Rango numérico')}>
              Rango numérico
            </p>
          </div>

          <div className='optionsBox'>
            {showOptionsInput && (
              <React.Fragment>
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
                  className="addOptionButton"
                  onClick={handleAddOption}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <p>Agregar</p>
                  <svg> Add </svg>
                </button>
              </React.Fragment>
            )}
          </div>

          {selectedOption === 'Lista de Opciones' && options.length > 0 && (
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

        <button
          className="addButton"
          onClick={handleAddSkill}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <div className="add-hability-svg-container">
            <img src={Add} alt="Add Icon" />
          </div>
        </button>
      </div>

        <div className="skills-list">
          <h2>Habilidades ingresadas:</h2>
          <ul className="skills-added-list">
            {skills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.header}:</strong>
                <ul>
                  {Array.isArray(skill.opciones) ? (
                    skill.opciones.map((opcion, opcionIndex) => (
                      <li key={opcionIndex}>{opcion}</li>
                    ))
                  ) : (
                    <li>Opciones no es un array</li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>


      <DownloadTemplateButton onClick={handleDownload}>Descargar Template</DownloadTemplateButton>
    </div>
  );
}

export default Download;
