const XLSX = require('xlsx');

const mainElement = document.querySelector('.data');
const fields = [
    'Ответственный (Кто совершил визит)',
    'Тип визита',
    'Дата визита',
    'Компания',
    'Чек-Лист',
    'Отчёт-Рассказ',
    'Файл Обучение',
    'Бланк предписания (зелёный)',
    'Бланк визита (голубой)',
    'Файл Виды работ',
];

function processWb(wb) {
    console.log(wb);
    const sheetName = wb.Sheets['Sheet1'];
    const arrData = XLSX.utils.sheet_to_json(sheetName);
    console.log(arrData);

    const tableElement = document.createElement('table');

    const headerRow = document.createElement('tr');
    fields.forEach(field => {
        const tableHeaderElement = document.createElement('th');
        tableHeaderElement.innerText = field;
        headerRow.appendChild(tableHeaderElement);
    });

    tableElement.appendChild(headerRow);

    arrData.forEach(item => {
        const rowElement = document.createElement('tr');

        fields.forEach(field => {
            const dataElement = document.createElement('td');
            dataElement.innerText = item[field] ? item[field] : '';
            rowElement.appendChild(dataElement);
        })

        tableElement.appendChild(rowElement);
    });

    mainElement.style.width = '2500px';
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