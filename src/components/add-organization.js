// src/components/add-organization.js
import React from 'react';
import '../styles/components/form.css';

function AddOrganization({ handleSubmit, handleClose }) {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Agregar Organización existente</h2>
        <div className="form-group">
          <label htmlFor="orgCode">Código de la organización:</label>
          <input type="text" id="orgCode" name="orgCode" required />
        </div>
        <button type="submit" className="form-submit-btn">
          <span>Agregar</span>
        </button>
        <button type="button" onClick={handleClose} className="form-submit-btn">
          <span>Cancelar</span>
        </button>
      </form>
    </div>
  );
}

export default AddOrganization;
