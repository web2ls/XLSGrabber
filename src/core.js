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


    const columnHeaderList = new Map();
    for (const key in data) {
        const firstSymbolOfColumn = key.slice(0, 1);
        if (columnHeaderList.has(firstSymbolOfColumn)) {
            const value = columnHeaderList.get(firstSymbolOfColumn);
            value.push(data[key]);
        } else {
            columnHeaderList.set(firstSymbolOfColumn, [data[key]]);
        }
    };

    console.dir(columnHeaderList);
});