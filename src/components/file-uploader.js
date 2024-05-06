import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/components/fileUploader.css';
import ExcelFile from '../assets/excel-file.svg'; // Importa tu SVG desde la carpeta de activos

function FileUploader({
  name,
  label,
  types,
  handleChange,
  classes,
  children,
  maxSize,
  minSize,
  fileOrFiles,
  onSizeError,
  onTypeError,
  onSelect,
  onDrop,
  disabled,
  multiple,
  required,
  // onDraggingStateChange,
  // dropMessageStyle,
  message // Nueva prop para la frase
}) {
  const labelRef = useRef(null);
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [error, setError] = useState(false);

  let H = 0; // Definición de la variable H para el conteo de eventos de arrastre

  const handleChanges = useCallback(() => {

    inputRef.current.click();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (--H === 0) setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const selectedFiles = multiple ? files : files[0];
      const isValid = validateFile(selectedFiles);
      if (isValid) {
        handleChange(selectedFiles);
        setSelectedFiles(selectedFiles);
      }
      onDrop && isValid && onDrop(selectedFiles);
    }
  }, [handleChange, multiple, onDrop]);

  const handleDragEnter = useCallback((e) => {
    if(e){
      e.preventDefault();
      e.stopPropagation();
      H++;
      setDragging(true);
    }


  }, []);

  const handleDragLeave = useCallback((e) => {
    if(e){
      e.preventDefault();
      e.stopPropagation();
      if (--H === 0) setDragging(false);
    }



  }, []);

  const handleDragOver = useCallback((e) => {
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }

  }, []);

  useEffect(() => {
    if(labelRef.current){
      labelRef.current.addEventListener('click', handleChanges);
      labelRef.current.addEventListener('dragenter', handleDragEnter);
      labelRef.current.addEventListener('dragleave', handleDragLeave);
      labelRef.current.addEventListener('dragover', handleDragOver);
      labelRef.current.addEventListener('drop', handleDrop);
    }

    return () => {
      if(labelRef.current) {
        labelRef.current.removeEventListener('click', handleChanges);
        labelRef.current.removeEventListener('dragenter', handleDragEnter);
        labelRef.current.removeEventListener('dragleave', handleDragLeave);
        labelRef.current.removeEventListener('dragover', handleDragOver);
        labelRef.current.removeEventListener('drop', handleDrop);
      }

    };
  }, [handleChanges, handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  const validateFile = (file) => {
    if (types && !types.map((ext) => ext.toLowerCase()).includes(file.name.split('.').pop().toLowerCase())) {
      setError(true);
      onTypeError && onTypeError('File type is not supported');
      return false;
    }
    if (maxSize && convertBytesToMB(file.size) > maxSize) {
      setError(true);
      onSizeError && onSizeError('File size is too big');
      return false;
    }
    if (minSize && convertBytesToMB(file.size) < minSize) {
      setError(true);
      onSizeError && onSizeError('File size is too small');
      return false;
    }
    setError(false);
    return true;
  };

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target.files;
    const selectedFiles = multiple ? files : files[0];
    const isValid = validateFile(selectedFiles);
    if (isValid) {
      handleChange(selectedFiles);
      setSelectedFiles(selectedFiles);
    }
    onSelect && isValid && onSelect(selectedFiles);
  };

  const convertBytesToMB = (bytes) => {
    return bytes / 1e6;
  };

  const renderFileTypes = () => {
    if (types) {
      const typesString = types.toString();
      return (
        <span title={`types: ${typesString}`} className="file-types">{typesString}</span>
      );
    }
    return null;
  };

  const renderInfoText = () => {
    if (!fileOrFiles) {
      return (
        <>
          <span>{renderFileTypes()}</span>
          {children && <span>{children}</span>}
          {message && <span className="file-uploader-message">{message}</span>} {/* Renderiza la frase si se proporciona */}
        </>
      );
    }
    if (selectedFiles || dragging) {
      return (
        <span>Uploaded Successfully! Upload another?</span>
      );
    }
    return (
      <span>Upload or drop a file right here</span>
    );
  };

  return (
    <label
      className={`file-uploader ${classes || ''} ${disabled ? 'is-disabled' : ''}`} // Agrega la clase file-uploader aquí
      htmlFor={name}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      ref={labelRef}
    >
      <input
        onClick={(e) => {
          e.stopPropagation();
          inputRef && inputRef.current && (inputRef.current.value = '');
          inputRef && inputRef.current && inputRef.current.click();
        }}
        onChange={handleSelect}
        accept={types ? `.${types.map((ext) => ext.toLowerCase()).join(',')}` : undefined}
        ref={inputRef}
        type="file"
        name={name}
        disabled={disabled}
        multiple={multiple}
        required={required}
      />
      {dragging && <div className="background-overlay"><span>{label || 'Drop Here'}</span></div>}
      {!fileOrFiles && (
        <>
          <div className="file-uploader-svg-container"> {/* Cambio de clase para el contenedor del icono SVG */}
            <img src={ExcelFile} alt="Excel Icon" />
          </div>
          {renderInfoText()}
        </>
      )}
    </label>
  );
}

export default FileUploader;
