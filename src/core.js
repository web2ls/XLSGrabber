const XLSX = require('xlsx');

const mainElement = document.querySelector('.data');

function processWb(wb) {
    console.log(wb);
    const sheetName = wb.Sheets['Sheet1'];
    const arrData = XLSX.utils.sheet_to_json(sheetName);
    console.log(arrData);

    const tableElement = document.createElement('table');
    arrData.forEach(item => {
        const rowElement = document.createElement('tr');

        const dataElement = document.createElement('td');
        dataElement.innerText = item['Дата визита'];
        rowElement.appendChild(dataElement);
        tableElement.appendChild(rowElement);
    });

    mainElement.appendChild(tableElement);
}

const inputFileElement = document.getElementById('file');
inputFileElement.addEventListener('change', (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function () {
        let data = reader.result;
        data = new Uint8Array(data);
        processWb(XLSX.read(data, { type: 'array' }));
    }

    reader.readAsArrayBuffer(file);
});