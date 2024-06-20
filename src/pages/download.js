import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/pages/download.css";
import Add from '../assets/add.svg';
import generateTemplate from '../components/generateTemplate';
import starIcon from '../assets/info-icons/star-icon.svg';
import MoreInfo from '../components/moreInfo';
import Header from '../components/header';
import withAuthorization from '../components/withAuthorization';
import DownloadTemplateButton from '../components/download-template-button';

function Download2() {
  const [skills] = useState([{ header: 'Nombre' }, { header: 'No juega con' }]);
  const [roles, setRoles] = useState([]);
  const [, setShowPopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [specifyRoles, setSpecifyRoles] = useState(null);
  const [additionalInputValue, setAdditionalInputValue] = useState('');
  const [attributes, setAttributes] = useState([{ id: 1, header: '', opciones: Array.from({ length: 50 }, (_, index) => index + 1) }]);

  const handleDownload = () => {
    try {
      const formattedSkills = skills.map(skill => {
        if (skill.opciones && skill.opciones.length > 0) {
          return { header: skill.header, opciones: skill.opciones };
        } else {
          return { header: skill.header };
        }
      });

      if (specifyRoles) {
        formattedSkills.push({ header: 'Rol', opciones: roles });
      }

      // Add attributes to the template
      attributes.forEach(attribute => {
        if (attribute.header.trim()) {
          formattedSkills.push({ header: attribute.header, opciones: attribute.opciones });
        }
      });

      generateTemplate(formattedSkills);
      setShowPopup(true);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error al descargar el archivo');
    }
  };

  const handleAdditionalInputChange = (event) => {
    setAdditionalInputValue(event.target.value);
  };

  const handleKeyPressRole = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita que se envíe un formulario si está dentro de uno
      if (specifyRoles !== null) {
        handleAddRole();
      }
    }
  };

  const handleAddRole = () => {
    const trimmedRole = additionalInputValue.trim();

    if (!trimmedRole) {
      toast.error('Por favor, ingresa un rol');
      return;
    }

    if (roles.map(role => role.toLowerCase()).includes(trimmedRole.toLowerCase())) {
      toast.error('Este rol ya ha sido ingresado');
      return;
    }

    setRoles([...roles, trimmedRole]);
    setAdditionalInputValue('');
  };

  const handleAddAttribute = () => {
    const lastAttribute = attributes[attributes.length - 1];
    if (!lastAttribute.header.trim()) {
      toast.error('Por favor, ingresa un nombre para el atributo actual antes de agregar uno nuevo');
      return;
    }

    const newAttribute = { id: attributes.length + 1, header: '', opciones: Array.from({ length: 50 }, (_, index) => index + 1) };
    setAttributes([...attributes, newAttribute]);
  };

  const handleKeyPressAttribute = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita que se envíe un formulario si está dentro de uno
      if (specifyRoles !== null) {
        handleAddAttribute();
      }
    }
  };

  const handleAttributeChange = (index, event) => {
    const newAttributes = [...attributes];
    newAttributes[index].header = event.target.value;
    setAttributes(newAttributes);
  };

  const handleStart = (answer) => {
    console.log("handleStart called with answer:", answer);
    if (answer) {
      setSpecifyRoles(answer);
      setCurrentStep(1);
    } else {
      setCurrentStep(2);
    }
  };

  const handleNextStep = () => {
    console.log("handleNextStep called");
    setCurrentStep(2);
  };

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
              <h3>¿Deseas atribuirle un rol a cada participante?</h3>
              <li>En ese caso, ¡haz click en "Si" y añade a tu template todos los roles posibles!</li>
              <li>En caso contrario, haz click en "No" y procede a añadir los atributos numéricos que harán que tus equipos se repartan de forma pareja.</li>
            </ul>
          </div>
        </MoreInfo>
        <ToastContainer />
        <div className='download-header'>
          <h1> &#9312; ¿Deseas especificar el rol de cada participante?</h1>
        </div>
        <div className="download-actions">
          <button className="startButton" onClick={() => handleStart(true)}>Sí</button>
          <button className="startButton" onClick={() => handleStart(false)}>No</button>
        </div>
      </div>
    );
  } else if (currentStep === 1 && specifyRoles) {
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
              <li>Añade todos los roles que adoptarán los miembros de tus equipos con el botón de +.</li>
              <li>Recuerda que podrás asignar un solo rol a cada participante.</li>
              <li>Una vez añadidos todos, haz click en "Siguiente".</li>
            </ul>
          </div>
        </MoreInfo>
        <ToastContainer />
        <div className='addBox'>
          <div className="inputBox">
            <h2>Roles</h2>
            <input
              className="textInput"
              type="text"
              placeholder="Nuevo rol"
              value={additionalInputValue}
              onChange={handleAdditionalInputChange}
              onKeyPress={handleKeyPressRole} // Aquí agregamos el manejador de tecla
            />
            <button
              className="addButton roundButton"
              onClick={handleAddRole}
            >
              <div className="add-hability-svg-container">
                <img src={Add} alt="Add Icon" />
              </div>
            </button>
            {roles.length > 0 && (
              <div className="options-list">
                <h2>Roles ingresados:</h2>
                <ul className="options-added-list">
                  {roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="download-actions">
            <button className="nextButton" onClick={handleNextStep}>Siguiente</button>
          </div>
        </div>
      </div>
    );
  } else if (currentStep === 2) {
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
              <li>Agrega todos los atributos numéricos que quieras asignarle a los miembros de tus equipos con el botón +.</li>
              <p>¡Recuerda que estos serán cruciales a la hora de realizar el emparejamiento de los equipos!</p>
              <li>Descarga la Plantilla: Haz clic en "Descargar Template".</li>
              <li>Completa la Plantilla: Llena con nombres de participantes y sus puntuaciones (1 a 50) para las habilidades elegidas.</li>
            </ul>
          </div>
        </MoreInfo>
        <ToastContainer />
        <div className='addBox'>
          <div className="inputBox">
            <h1>Atributos Numéricos</h1>
            {attributes.map((attribute, index) => (
              <div key={attribute.id}>
                <h2>Atributo {attribute.id}</h2>
                <input
                  className="textInput"
                  type="text"
                  value={attribute.header}
                  onChange={(e) => handleAttributeChange(index, e)}
                  placeholder={`Nuevo atributo ${attribute.id}`}
                  onKeyPress={handleKeyPressAttribute}
                />
              </div>
            ))}
            <button
              className="addButton roundButton"
              onClick={handleAddAttribute}
            >
              <div className="add-hability-svg-container">
                <img src={Add} alt="Add Icon" />
              </div>
            </button>
          </div>
        </div>
        {/* Conditional rendering of the download button */}
        {attributes.length > 1 && (
          <DownloadTemplateButton onClick={handleDownload}>Descargar Template</DownloadTemplateButton>
        )}
      </div>
    );
  }
}

export default withAuthorization(Download2);
