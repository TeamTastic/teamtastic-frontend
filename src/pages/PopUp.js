import "../styles/pages/PopUp.css";
import React from 'react';

function PopUp({ onClose, onContinue }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Descarga Completa</h2>
        <p>Presione continuar para subir su Excel</p>
        <button className="popup-button" onClick={onContinue}>Continuar</button>
        <button className="popup-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default PopUp;