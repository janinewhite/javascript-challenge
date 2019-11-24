// from data.js
var tableData = data;
console.log(tableData)
var firstRow = tableData[0]

// Capitalize string
function capitalize(text) {
    return text.slice(0,1).toUpperCase()+text.slice(1)
}

// Create table header
function generateTableHead(thead,firstRow) {
    console.log(firstRow)
    //let thead = table.createTHead();
    let row = thead.tr;
    keyNames = Object.keys(firstRow)
    console.log(keyNames)
    for (keyName of keyNames) {
        console.log(keyName)
        keyName = keyName[0].toUpperCase()+keyName.slice(1)
        if (keyName == "Datetime") {
            keyName = "Date"
        } else {
            if (keyName == "DurationMinutes"){
                keyName = "Minutes"
            }

        }       
        let th = document.createElement("th");
        let text = document.createTextNode(keyName);
        th.appendChild(text);
        row.appendChild(th);
    }
}

// Create table body
function generateTable(table, data) {
    for (element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

let table = document.querySelector("table");
let thead = document.querySelector("thead");
generateTable(table, tableData);
generateTableHead(thead, firstRow);