import React from 'react';
import '../styles/components/download-template-button.css'; // Importamos los estilos CSS

function DownloadTemplateButton({ onClick, children }) {
  return (
    <button className='download-template-button download-template-button--gooey' onClick={onClick}>
      {children}
      <div className='download-template-button__blobs'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </button>
  );
}

export default DownloadTemplateButton;
