import excelJs from 'exceljs';

const generateTemplate = async (columnas) => {
    const workbook = new excelJs.Workbook();
    const ws = workbook.addWorksheet('Test Worksheet');

    // Agregar encabezados de columna
    const headers = columnas.map((columna) => columna.header);
    ws.addRow(headers);

    // Configurar restricciones y opciones para cada columna
    columnas.forEach((columna, index) => {
        const columnaLetra = String.fromCharCode(65 + index); // Convertir índice en letra de columna (A, B, C, ...)
        const cellAddress = columnaLetra + '2'; // Dirección de la celda para la validación de datos
    
        if (Array.isArray(columna.opciones)) {
            // Configurar lista desplegable si hay opciones disponibles
            ws.getCell(cellAddress).value = `Selecciona un(a) ${columna.header}:`;
            ws.getCell(cellAddress).dataValidation = {
                type: 'list',
                allowBlank: false,
                formulae: [`"${columna.opciones.join(',')}"`],
            };
        }
    });
    

    // Establecer el ancho de las columnas
    ws.columns.map((col) => (col.width = 18));

    // Escribir el archivo Excel y descargarlo
    const excelBlob = await workbook.xlsx.writeBuffer();
    const excelUrl = URL.createObjectURL(new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'template.xlsx';
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(excelUrl);
    document.body.removeChild(link);
};

export default generateTemplate;