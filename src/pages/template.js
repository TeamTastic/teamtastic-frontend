import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FileUploader } from "react-drag-drop-files";

function Template() {
  const fileTypes = ["XLSX"];
  const [files, setFiles] = useState(null);

  const data = [{
          NOMBRE: '',
          DEFENSA: '',
          VELOCIDAD:'',
          CONTROL:'',
          RESISTENCIA:'',
          PUNTERIA:	'',
          EXCLUIR:''
      }];

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
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

      saveAs(blob, "template.xlsx");
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const handleChange = (file) => {
    setFiles(file);
  };

  return (
      <div className="template-container">
          <div className='load-template'>
              <h1> Descarga y carga Template </h1>
              <button className='dowloadbtn' onClick={handleDownload}> Descargar Template</button>
              <div className='fileUploader'>
                  <FileUploader handleChange={handleChange} name="file" label='Suba su planilla de datos completa'
                                types={fileTypes} multiple={false}/>
              </div>
          </div>
          <div className='load-abilities'>
              <label> Ingrese hasta 5 habilidades </label>
              <input />
          </div>

      </div>
  );
}

export default Template;
