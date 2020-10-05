const XLSX = require('xlsx');
console.log(XLSX);

console.log('message from js code');

const inputFileElement = document.getElementById('file');
inputFileElement.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const workbook = XLSX.readFile(file.path);
    console.log(workbook);
    const data = workbook.Sheets.Sheet1;
    console.log(data);


    const columnList = [];
    for (const key in data) {
        columnList.push(key.slice(0, 1));
    };
    const uniqueColumnList = Array.from(new Set(columnList));

    console.dir(uniqueColumnList);
});