import excelJs from 'exceljs';

const generateTemplate = async (columnas) => {
    const workbook = new excelJs.Workbook();
    const ws = workbook.addWorksheet('Test Worksheet');

    // Agregar encabezados de columna y configurar estilo
    const headers = columnas.map((columna) => columna.header);
    ws.addRow(headers);
    ws.getRow(1).font = { size: 22, bold: true, font: 'Cambria' };
    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }; // Centrar los encabezados
    
    // Configurar restricciones y opciones para cada columna
    columnas.forEach((columna, index) => {
        const columnaLetra = String.fromCharCode(65 + index); // Convertir índice en letra de columna (A, B, C, ...)
        const cellAddress = columnaLetra + '2'; // Dirección de la celda para la validación de datos
    
        if (Array.isArray(columna.opciones)) {
            // Configurar lista desplegable si hay opciones disponibles
            ws.getCell(cellAddress).value = `Selecciona un valor:`;
        }
        if ((columna.header) === 'No juega con') {
            ws.getCell(cellAddress).value = `Ingresa si hay restricciones en los equipos`
        }
        if ((columna.header) === 'Nombre') {
            ws.getCell(cellAddress).value = `Ingresa nombre, apellido y/o apodo identificatorio`
        }

        // Ajustar el texto para que aparezca en varias líneas dentro de la celda
        ws.getCell(cellAddress).alignment = { wrapText: true };
    });

    // Asegurar que haya un total de 100 filas con listas desplegables
    for (let rowIndex = 3; rowIndex <= 102; rowIndex++) {
        columnas.forEach((columna, index) => {
            const cellAddress = String.fromCharCode(65 + index) + rowIndex; // Dirección de la celda para la validación de datos
            if (Array.isArray(columna.opciones)) {
                ws.getCell(cellAddress).dataValidation = {
                    type: 'list',
                    allowBlank: false,
                    errorStyle: 'stop',  // Estilo de error (stop para detener entrada de datos no válidos)
                    errorTitle: 'Valor inválido',  // Título del mensaje de error
                    error: 'El valor ingresado no está en la lista.',  // Mensaje de error
                    showErrorMessage: true,  // Mostrar mensaje de error si el valor no es válido
                    formulae: [`"${columna.opciones.join(',')}"`],
                };
            }
        });
    }

    // Establecer el ancho de las columnas
    ws.columns.forEach((col) => (col.width = 30));

    // Ajustar automáticamente el tamaño de las celdas al contenido
    ws.columns.forEach((column, index) => {
        ws.getColumn(index + 1).eachCell({ includeEmpty: true }, (cell) => {
            cell.alignment = { wrapText: true };
            column.width = Math.max(column.width, cell.value ? String(cell.value).length * 1.1 : 10);
        });
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
