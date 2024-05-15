import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import FileUploader from "../components/file-uploader"
import DownloadTemplateButton from "../components/download-template-button";
import BlockRoutes from "../components/block-routes";
import Header from "../components/header";

function Template() {
  const fileTypes = ["XLSX"];
  const [files, setFiles] = useState(null)


  const data = [{
    NOMBRE: '',
    DEFENSA: '',
    VELOCIDAD:'',
    CONTROL:'',
    RESISTENCIA:'',
    PUNTERIA: '',
    EXCLUIR:''
  }];



  useEffect(() => {
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        let workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const csvfile = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        console.log(csvfile);
      };
      reader.readAsBinaryString(files);
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
    <div className="App">
      <BlockRoutes />
      <Header />
      <DownloadTemplateButton onClick={handleDownload}>Descargar Template</DownloadTemplateButton>
      <div className='fileUploader'>
        <FileUploader
          handleChange={handleChange}
          name="file"
          label='Suba su planilla de datos completa'
          types={fileTypes}
          multiple={false}
          message="Arrastre y suelte el archivo aquí o haga clic para seleccionar" // Mensaje para mostrar debajo del icono SVG
        />
      </div>
    </div>
  );
}

export default Template;
