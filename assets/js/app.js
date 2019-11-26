// Define filter values
var dateText = "";
var cityText = "";
var stateSelected = "";
var shapeSelected = "";

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
function generateTableBody(body, data, dateFilter, cityFilter, stateFilter, shapeFilter) {
    console.log("Loading Table Body, Filters: "+dateFilter+", "+cityFilter+", "+stateFilter+", "+shapeFilter);
    for (element of data) {
        noneSelected = ((dateFilter == "") && (cityFilter == "") && (stateFilter == "") && (shapeFilter == ""));
        let dateFound = ((dateFilter == "") || (dateFilter == element.datetime));
        let cityFound = ((cityFilter == "") || (cityFilter == element.city));
        let stateFound = ((stateFilter == "") || (stateFilter == element.state));
        let shapeFound = ((shapeFilter == "") || (shapeFilter == "none") || (shapeFilter == element.shape));
        if (noneSelected || (dateFound && cityFound && stateFound && shapeFound)) {
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

// Add events

var button = d3.select("#DateFilter");
button.on("click", redoTableRows);
var inputDate = d3.select("#DateInput");
var inputCity = d3.select("#CityInput");
var selectState = d3.select("#select-state-col").select("select");
var selectShape = d3.select("#select-shape");

inputDate.on("change", function() {
  dateText = d3.event.target.value;
  console.log("Date Input changed: "+dateText);
});
inputCity.on("change", function() {
  cityText = d3.event.target.value.toLowerCase();
  console.log("City Input changed: "+cityText);
});
selectState.on("change", function() {
    stateSelected = d3.select(this).property('value').toLowerCase();
    console.log("State Selection changed: "+stateSelected);
});
selectShape.on("change", function() {
    shapeSelected = d3.event.target.value.toLowerCase();
    console.log("Shape Selection changed: "+shapeSelected);
});

// Remove table body rows, then add filtered rows
function redoTableRows() {
    let d3tbody = d3.select("tbody");
    d3tbody.html("");
    generateTableBody(tbody, data, dateText, cityText, stateSelected, shapeSelected)
}

// Create Curated Sightings Table
generateTableBody(tbody, tableData, "", "", "", "");
generateTableHead(theadRow, firstRow);

