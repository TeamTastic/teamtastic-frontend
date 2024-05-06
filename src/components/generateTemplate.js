import excelJs from 'exceljs';

const generateTemplate = async (columnas) => {
    const workbook = new excelJs.Workbook();
    const ws = workbook.addWorksheet('Test Worksheet');

    // Agregar encabezados de columna y configurar estilo
    const headers = columnas.map((columna) => columna.header);
    ws.addRow(headers);
    ws.getRow(1).font = { size: 22, bold: true, font: 'Cambria' };
    ws.getRow(1).alignment = { vertical:'middle', horizontal: 'center' }; // Centrar los encabezados
    

    // Configurar restricciones y opciones para cada columna
    columnas.forEach((columna, index) => {
        const columnaLetra = String.fromCharCode(65 + index); // Convertir índice en letra de columna (A, B, C, ...)
        const cellAddress = columnaLetra + '2'; // Dirección de la celda para la validación de datos
    
        if (Array.isArray(columna.opciones)) {
            // Configurar lista desplegable si hay opciones disponibles
            ws.getCell(cellAddress).value = `Selecciona un valor:`;
        }
    });

    // Asegurar que haya un total de 100 filas con listas desplegables
    for (let rowIndex = 3; rowIndex <= 102; rowIndex++) {
        columnas.forEach((columna, index) => {
            const cellAddress = String.fromCharCode(65 + index) + rowIndex; // Dirección de la celda para la validación de datos
            if (Array.isArray(columna.opciones)) {
                ws.getCell(cellAddress).dataValidation = {
                    type: 'list',
                    allowBlank: false,
                    formulae: [`"${columna.opciones.join(',')}"`],
                };
            }
        });
    }

    // Establecer el ancho de las columnas
    ws.columns.forEach((col) => (col.width = 30));

    ws.eachRow((row, rowIndex) => {
        if (rowIndex !== 1) {
            row.font = { font: 'Arial', size: 14 }; // Ejemplo: quitar negrita
            row.alignment = { vertical:'middle', horizontal: 'center' }; // Centrar los encabezados
            // Aquí puedes aplicar otros estilos o acciones a cada fila
        }
    });


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
