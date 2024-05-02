import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/download.css";
import DownloadTemplateButton from '../components/download-template-button';
import generateTemplate from '../components/generateTemplate'; // Importar la función generateTemplate

function ExcelPage() {
  const handleGenerateExcel = async () => {

    const columnas = [
      {header: 'Nombre'},
      { header: 'Apodo', opciones: ['Juan', 'María', 'Pedro'] },
      { header: 'Edad', opciones: Array.from({ length: 20 }, (_, index) => index + 1)},
      { header: 'Género', opciones: ['Masculino', 'Femenino', 'Otro'] },
    ];

    await generateTemplate(columnas); // Llamar a la función generateTemplate con la lista de columnas
  };

return (
    <DownloadTemplateButton onClick={handleGenerateExcel}>Descargar Template</DownloadTemplateButton>
);
}
export default ExcelPage;
