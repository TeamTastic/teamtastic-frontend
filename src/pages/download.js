import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/download.css"
import Add from '../assets/add.svg'
import DownloadTemplateButton from '../components/download-template-button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Download() {
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState(['Nombre']); // Establecer 'Nombre' como habilidad predeterminada

  async function handleDownload() {
    try {
      // Organizar los datos con las habilidades separadas por coma
      skills.join(', ')
      // Crear la hoja de cálculo
      const worksheet = XLSX.utils.json_to_sheet([skills], { skipHeader: true });
  
      // Crear el libro de trabajo y adjuntar la hoja de cálculo
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Convertir el libro de trabajo a un buffer Excel y guardarlo como archivo
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      saveAs(blob, "template.xlsx");
    } catch (error) {
      console.error('Error downloading file:', error);
      // Mostrar notificación de error
      toast.error('Error al descargar el archivo');
    }
  }  

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleAddSkill() {
    if (skills.length > 5) {
      // Mostrar notificación cuando ya hay 5 habilidades ingresadas
      toast.error('Ya has ingresado 5 habilidades');
      return;
    }

    if (skills.includes(inputValue.trim())) {
      // Mostrar notificación si la habilidad ya está ingresada previamente
      toast.error('Esta habilidad ya ha sido ingresada');
      return;
    }
    setSkills([...skills, inputValue.trim()]);
    setInputValue('');
  }

  return (
    <div className="download-container">
      <ToastContainer />
      <div className='download-header'>
        <h1> &#9312; Ingrese hasta 5 nuevas habilidades</h1>
      </div>
      <div className="addBox">
        <input
          className="textInput"
          type="text"
          name=""
          placeholder="Nueva habilidad"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="addButton" onClick={handleAddSkill}>
          <div className="add-hability-svg-container">
            <img src={Add} alt="Add Icon" />
          </div>
        </button>
      </div>
      <div className="skills-list">
        <h2>Habilidades ingresadas:</h2>
        <ul className="skills-added-list">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <DownloadTemplateButton onClick={handleDownload}>Descargar Template</DownloadTemplateButton>
    </div>
  );
}

export default Download;
