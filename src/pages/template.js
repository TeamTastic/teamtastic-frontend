import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FileUploader } from "react-drag-drop-files";

function Template() {
  const fileTypes = ["XLSX"];
  const [files, setFiles] = useState(null);

  useEffect(() => {
      if (files) {
          const reader = new FileReader();
          reader.onload=()=> {
              const data = reader.result;
              let workbook = XLSX.read(data, {type: 'binary'});
              const sheetName = workbook.SheetNames[0];
              const csvfile = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName])
              console.log(csvfile)
          }
          reader.readAsBinaryString(files)
      }

}, [files]);

  async function handleDownload() {
    try {
      const response = await fetch('./res/TEMPLATE.xlsx');
      const blob = await response.blob();
      saveAs(blob, 'template.xlsx');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const handleChange = (file) => {
    setFiles(file);
  };

  return (
      <div className="App">
        <h1> Descarga y carga Template </h1>
        <button className='dowloadbtn' onClick={handleDownload}> Descargar Template</button>
        <div className='fileUploader'>
          <FileUploader handleChange={handleChange} name="file" label='Suba su planilla de datos completa' types={fileTypes} multiple={false}/>
        </div>
      </div>
  );
}

export default Template;
