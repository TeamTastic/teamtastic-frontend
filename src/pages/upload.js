import React, { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../axiosConfig';
import 'react-toastify/dist/ReactToastify.css';
import FileUploader from "../components/file-uploader";
import "../styles/pages/upload.css";
import MoreInfo from "../components/moreInfo";
import starIcon from "../assets/info-icons/star-icon.svg";
import { useNavigate } from "react-router-dom";
import anotherInstance from "../anotherInstance";
import withAuthorization from "../components/withAuthorization";

function Upload() {
  const fileTypes = ["XLSX"];
  const [files, setFiles] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [publicUrl, setPublicUrl] = useState('');
  const [ligueName, setLigueName] = useState('');
  const [teamsNumber, setTeamsNumber] = useState('');

  const sendDataToBackend = useCallback(async (publicUrl) => {
    try {
      const response = await axios.post('/uploaded_data', { data: publicUrl, ligueName, teamsNumber });
      console.log('Backend response:', response.data);
      toast.success('Datos subidos exitosamente!');
    } catch (error) {
      console.error("Error al subir datos:", error);
      toast.error('Error al subir datos al backend');
    } finally {
      setIsUploading(false);
      navigate('/teams');
    }
  }, [navigate, ligueName, teamsNumber]);

  const sendDataToBucket = useCallback(async (file) => {
    const filename = encodeURI(file.name);
    const contentType = file.type;
    setIsUploading(true);
    try {
      const response = await axios.get('/generate-signed-url', { params: { filename, contentType } });
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
  }, [sendDataToBackend]);

  useEffect(() => {
    if (files) {
      sendDataToBucket(files);
      const reader = new FileReader();
      reader.onload = () => {
        sendDataToBucket(files).then(() => console.log(publicUrl));



        // const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // sendDataToBackend(jsonData).then(r => console.log(r))
        // console.log(jsonData);
      };
      reader.readAsBinaryString(files);
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
      <div className='register-form'>
        <label>
          <input
            required
            placeholder=""
            type="text"
            className="register-input"
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
            className="register-input"
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
