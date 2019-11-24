// Get data from data.js
var tableData = data;
var firstRow = tableData[0]

// Define table elements
var table = document.querySelector("table");
var thead = document.querySelector("thead");
var theadRow = thead.querySelector("tr");
var tbody = document.querySelector("tbody");

// Capitalize string
function capitalize(text) {
    return text.slice(0,1).toUpperCase()+text.slice(1)
}

// Capitalize all words in a string
function titleCase(text) {
    return text.toLowerCase().split(' ').map(x => capitalize(x)).join(' ');
}

// Create table header
function generateTableHead(row,firstRow) {
    console.log("Loading Table Header");
    // Use keys as table header
    keyNames = Object.keys(firstRow)
    for (keyName of keyNames) {
        keyName = capitalize(keyName);
        // Fix header text
        if (keyName == "Datetime") {
            keyName = "Date"
        } else {
            if (keyName == "DurationMinutes"){
                keyName = "Duration"
            }

        }
        // Add header cell
        var th = document.createElement("th");
        let text = document.createTextNode(keyName);
        th.appendChild(text);
        row.appendChild(th);
    }
}

// Create table body
function generateTableBody(body, data, dateFilter) {
    console.log("Loading Table Body, Filter: "+dateFilter);
    for (element of data) {
        if ((dateFilter == "") || (dateFilter == element.datetime) ) {
            let row = body.insertRow();
            for (key in element) {
                let cell = row.insertCell();
                let celltext = element[key]
                if ((key == "state") || (key == "country")) {
                    celltext = celltext.toUpperCase();
                } else {
                    if (key == "city") {
                        celltext = titleCase(celltext);
                    }
                }
                let textnode = document.createTextNode(celltext);
                cell.appendChild(textnode);
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

// Add button click event
var button = d3.select("#DateFilter");
button.on("click", redoTableRows);

// Add input change event
var inputField = d3.select("#DateInput");
var newText = "";
inputField.on("change", function() {
  newText = d3.event.target.value;
  console.log("Input changed: "+newText);
});

// Remove table body rows, then add filtered rows
function redoTableRows() {
    let d3tbody = d3.select("tbody");
    d3tbody.html("");
    generateTableBody(tbody, data, newText)
}

// Create Curated Sightings Table
generateTableBody(tbody, tableData, "");
generateTableHead(theadRow, firstRow);

