import React, { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../axiosConfig';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import FileUploader from "../components/file-uploader"
import "../styles/pages/upload.css"
import MoreInfo from "../components/moreInfo";
import starIcon from "../assets/info-icons/star-icon.svg";
import BlockRoutes from "../components/block-routes";
import Header from "../components/header";
import {useNavigate} from "react-router-dom";

function Upload() {
  const fileTypes = ["XLSX"];
  const [files, setFiles] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const sendDataToBackend = useCallback(async (jsonData) => {
    setIsUploading(true);
    try {
      await axios.post('/uploaded_data', { data: jsonData });
      toast.success('Datos subidos exitosamente!');

    } catch (error) {
      console.error("Error al subir datos:", error);
      handleUploadError(error);
    } finally {
      setIsUploading(false); // Indicar fin de la subida
    }

    if (!isUploading){
      navigate('/teams');
    }
  }, [isUploading, navigate]);
  
  useEffect(() => {
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        let workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        sendDataToBackend(jsonData).then(r => console.log(r))
        console.log(jsonData);
      };
      reader.readAsBinaryString(files);
    }
  }, [files, sendDataToBackend]);

  const handleChange = (file) => {
    if (validateFileType(file)) {
      setFiles(file);
    } else {
      toast.error('Archivo no compatible');
    }
  };

  const validateFileType = (file) => {
    const extension = file.name.split('.').pop().toUpperCase();
    return fileTypes.includes(extension);
  };

  const handleUploadSuccess = () => {
    toast.success('¡Archivo subido exitosamente!');
  };

  const handleUploadError = (error) => {
    toast.error(`Error al subir el archivo: ${error}`);
  };

  return (
    <div className="upload-container">
      <BlockRoutes />
      <Header />
      <MoreInfo>
        <div className='info-container'>
          <div className='info-header'>
            <img src={starIcon} alt="Star Icon"/>
            <h1>Subir Plantilla Llena</h1>
          </div>
          <ul>
            <li>Una vez completada la planilla con las puntuaciones, vuelve a esta página.</li>
            <li>Carga la planilla Excel llena utilizando el botón "Subir Planilla".</li>
          </ul>
        </div>
      </MoreInfo>
      <ToastContainer/>
        {isUploading && <div className="uploading-indicator">Cargando...</div>}
      <div className='upload-header'>
        <h1> &#9313; Suba su plantilla de datos completa</h1>
      </div>
      <div className='fileUploader'>
        <div className="file-uploader-container"> {/* Nuevo contenedor para FileUploader */}
          <FileUploader
              handleChange={handleChange}
              name="file"
              label=''
              types={fileTypes}
              multiple={false}
              message="Arrastre y suelte el archivo aquí o haga clic para seleccionar" // Mensaje para mostrar debajo del icono SVG
            onDrop={handleUploadSuccess}
            onSizeError={(error) => handleUploadError(error)}
            onTypeError={(error) => handleUploadError(error)}
          />
        </div>
      </div>
    </div>
  );
}

export default Upload;
