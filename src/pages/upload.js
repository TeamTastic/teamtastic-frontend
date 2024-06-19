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
  const [ligueName, setLigueName] = useState('');
  const [teamsNumber, setTeamsNumber] = useState('');

  const sendDataToBackend = useCallback(async (publicUrl) => {
    try {
      const response = await axios.post('/uploaded_data', { input_file_name: publicUrl, league_name:ligueName, teams_number:teamsNumber, org_name:currentOrganization });

      console.log('Backend response:', response.data);
      toast.success('¡Datos subidos correctamente!');
      setIsUploading(false);
      setTimeout(() => {
        navigate('/teams');
      }, 3000)
    } catch (error) {
      console.error("Error al subir datos:", error);
      toast.error(error);
    } 
  }, [navigate, ligueName, teamsNumber]);

  const sendDataToBucket = useCallback(async (file) => {
    const day = new Date().toISOString().split('T')[0];
    const filename = `${currentOrganization}-${ligueName}-${day}.${file.name.split('.').pop()}`;
    const encodedFilename = encodeURI(filename);
    const contentType = file.type;
    setIsUploading(true);
    try {
      const response = await axios.get('/generate-signed-url', { params: { filename: encodedFilename, contentType } });
      const { url } = response.data;

      await anotherInstance.put(url, file, {
        headers: {
          'Content-Type': contentType,
        },
      }).then(async () => {
        console.log('Archivo subido exitosamente:', encodedFilename);
        const publicUrl = `https://storage.googleapis.com/team_tastic_excels/${encodedFilename}`;
        setPublicUrl(publicUrl);

        await sendDataToBackend(publicUrl);
        console.log('Archivo subido exitosamente:', publicUrl);
      })
          .catch((error) => {console.error('Error al subir archivo:', error);});


    } catch (error) {
      console.error("Error durante la carga del archivo:", error);
      toast.error('Error al subir el archivo al bucket');
      setIsUploading(false);
    }
  }, [sendDataToBackend, currentOrganization, ligueName]);

  useEffect(() => {
    if (files) {
      sendDataToBucket(files);
      const reader = new FileReader();
      reader.onload = () => {
        sendDataToBucket(files).then(() => console.log(publicUrl));
      };
      reader.readAsBinaryString(files);
    }
  }, [files, publicUrl, sendDataToBucket]);

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
            value={ligueName}
            onChange={(e) => setLigueName(e.target.value)}
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
