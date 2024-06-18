import React from 'react';
import '../styles/components/invitePopup.css';

const InvitePopup = ({ isOpen, onClose, token }) => {
  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    alert('Token copiado al portapapeles');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Invitar a mi organización</h2>
        <p>Utiliza el siguiente token para invitar a nuevos miembros a tu organización:</p>
        <div className="token-box">
          {token}
        </div>
        <button onClick={handleCopyToken} className="copy-button">Copiar token</button>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default InvitePopup;
