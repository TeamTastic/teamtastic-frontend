// src/components/register-organization.js
import React from 'react';
//import '../styles/components/form.css';

function RegisterOrganization({ handleSubmit, handleClose }) {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Crear Organización</h2>
        <div className="form-group">
          <label htmlFor="orgName">Nombre de la organización:</label>
          <input type="text" id="orgName" name="orgName" required />
        </div>
        <button type="submit" className="form-submit-btn">
          <span>Registrar</span>
        </button>
        <button type="button" onClick={handleClose} className="form-submit-btn">
          <span>Cancelar</span>
        </button>
      </form>
    </div>
  );
}

export default RegisterOrganization;
