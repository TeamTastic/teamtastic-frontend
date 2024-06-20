import React, { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../axiosConfig';
import 'react-toastify/dist/ReactToastify.css';
import FileUploader from "../components/file-uploader";
import "../styles/pages/upload.css";
import MoreInfo from "../components/moreInfo";
import starIcon from "../assets/info-icons/star-icon.svg";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import anotherInstance from "../anotherInstance";
import withAuthorization from "../components/withAuthorization";
import { useOrganizations } from '../contexts/OrganizationsContext';

function Upload() {
  const { currentOrganization } = useOrganizations();
  const fileTypes = ["XLSX"];
  const [files, setFiles] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [publicUrl, setPublicUrl] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [teamsNumber, setTeamsNumber] = useState('');

  const sanitizedOrganization = currentOrganization.replace(/\s+/g, '-').replace(/#/g, '-').replace(/_/g, '-');
  const sanitizedLeagueName = leagueName.replace(/\s+/g, '-').replace(/_/g, '-'); // Reemplazar espacios con guiones bajos


  const sendDataToBackend = useCallback(async (publicUrl) => {
    try {
      const response = await axios.post('/uploaded_data', {
        'input_file_name': publicUrl,
        'league_name': sanitizedLeagueName,
        'teams_number': teamsNumber,
        'org_name': sanitizedOrganization
      });
      console.log('Backend response:', response.data);
      toast.success('¡Datos subidos correctamente!');
      setIsUploading(false);
      setTimeout(() => {
        navigate('/record');
      }, 3000);
    } catch (error) {
      console.error("Error al subir datos:", error);
      toast.error('Error al subir datos al servidor');
      setIsUploading(false);
    }
  }, [sanitizedLeagueName, teamsNumber, sanitizedOrganization, navigate]);

  const sendDataToBucket = useCallback(async (file) => {
    if (!leagueName || !teamsNumber) {
      toast.error('Por favor complete todos los campos requeridos');
      setIsUploading(false);
      return;
    }

    const day = new Date().toISOString().split('T')[0];
    console.log(sanitizedLeagueName)
    const filename = `${sanitizedOrganization}-${sanitizedLeagueName}-${day}`;
    const contentType = file.type;
    setIsUploading(true);

    try {
      const response = await axios.get('/generate-signed-url', { params: { filename: filename, contentType } });
      const { url } = response.data;

      await anotherInstance.put(url, file, {
        headers: {
          'Content-Type': contentType,
        },
      });

      const publicUrl = `https://storage.googleapis.com/team_tastic_excels/${filename}`;
      setPublicUrl(publicUrl);

      await sendDataToBackend(publicUrl);
    } catch (error) {
      console.error("Error durante la carga del archivo:", error);
      toast.error('Error al subir el archivo al bucket');
      setIsUploading(false);
    }
  }, [leagueName, teamsNumber, sanitizedLeagueName, sanitizedOrganization, sendDataToBackend]);

  useEffect(() => {
    if (files) {
      sendDataToBucket(files);
    }
  }, [files, sendDataToBucket]);

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
      <Header />
      <MoreInfo>
        <div className='info-container'>
          <div className='info-header'>
            <img src={starIcon} alt="Star Icon" />
            <h1>Subir Plantilla Llena</h1>
          </div>
          <ul>
            <li>Una vez completada la planilla con las puntuaciones, vuelve a esta página.</li>
            <li>Carga la planilla Excel llena utilizando el botón "Subir Planilla".</li>
          </ul>
        </div>
      </MoreInfo>
      <ToastContainer />
      {isUploading && <div className="uploading-indicator">Cargando...</div>}
      <div className='upload-header'>
        <h1>&#9313; Suba su plantilla de datos completa</h1>
      </div>
      <div className='upload-form'>
        <label>
          <input
            required
            placeholder=""
            type="text"
            className="upload-input"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
          <span>Nombre de la Liga</span>
        </label>
        <label>
          <input
            required
            placeholder=""
            type="number"
            className="upload-input"
            value={teamsNumber}
            onChange={(e) => setTeamsNumber(e.target.value)}
          />
          <span>Cantidad de Equipos</span>
        </label>
      </div>
      <div className='fileUploader'>
        <div className="file-uploader-container">
          <FileUploader
            handleChange={handleChange}
            name="file"
            label=''
            types={fileTypes}
            multiple={false}
            message="Arrastre y suelte el archivo aquí o haga clic para seleccionar"
            onDrop={handleUploadSuccess}
            onSizeError={(error) => handleUploadError(error)}
            onTypeError={(error) => handleUploadError(error)}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(Upload);
