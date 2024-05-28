import React, { useState } from 'react';

function RegisterOrganization({ handleSubmit, handleClose }) {
  const [orgName, setOrgName] = useState('');

  const handleInputChange = (event) => {
    setOrgName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(orgName);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <h2>Crear Organización</h2>
        <div className="form-group">
          <label htmlFor="orgName">Nombre de la organización:</label>
          <input
            type="text"
            id="orgName"
            name="org_name"
            value={orgName}
            onChange={handleInputChange}
            required
          />
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
