var dateFilterButton = document.getElementById("DateFilter")
var dateInput = document.getElementById("DateInput")
console.log("Input default: "+document.getElementById("DateInput").value)
var table = document.querySelector("table");
var thead = document.querySelector("thead");
var theadRow = thead.querySelector("tr");
var tbody = document.querySelector("tbody");
dateFilterButton.addEventListener("click", buttonAlert);

function deleteRows(table) {
    var rowCount = table.rows.length;
    var rowsDeleted = 0;
    for (var i = 0; i < rowCount; i++) {
        table.deleteRow[i];
        rowsDeleted += 1;
    }
    return rowsDeleted;
}

function buttonAlert() {
    alert(deleteRows(table));
}

// from data.js
var tableData = data;
var firstRow = tableData[0]

// Capitalize string
function capitalize(text) {
    return text.slice(0,1).toUpperCase()+text.slice(1)
}

// Create table header
function generateTableHead(row,firstRow) {
    //let thead = table.createTHead();
    keyNames = Object.keys(firstRow)
    for (keyName of keyNames) {
        keyName = keyName[0].toUpperCase()+keyName.slice(1)
        if (keyName == "Datetime") {
            keyName = "Date"
        } else {
            if (keyName == "DurationMinutes"){
                keyName = "Duration"
            }

        }       
        let th = document.createElement("th");
        let text = document.createTextNode(keyName);
        th.appendChild(text);
        row.appendChild(th);
    }
}

// Create table body
function generateTable(body, data, dateFilter) {
    for (element of data) {
        if ((dateFilter == "") || (dateFilter == element.datetime) ) {
            let row = body.insertRow();
            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }
}

function replaceTableBody(body, tableData) {
    alert("filtering");
    let filter = document.querySelector('#DateInput').value;
    console.log("Filtering by: "+filter);
    $('#Sightings').find("tr:gt(0)").remove();
    generateTable(tbody, tableData, filter);
}

generateTable(tbody, tableData, "");
generateTableHead(theadRow, firstRow);

