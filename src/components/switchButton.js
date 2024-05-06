import React from 'react';
import '../styles/components/switchButton.css';

function SwitchButton({ value, onChange, label }) {
  const handleChange = (event) => {
      if(event)
        onChange(event.target.checked ? "Rango numérico" : "Lista de Opciones");
  };

  return (
    <label className="checkbox-label">
      <div className="checkbox-toggle">
        <input
          className="checkbox-toggle-state"
          type="checkbox"
          checked={value === "Rango numérico"}
          onChange={handleChange}
        />
        <div className="checkbox-indicator"></div>
      </div>
      <span className="checkbox-label-text">{label}</span>
    </label>
  );
}

export default SwitchButton;
