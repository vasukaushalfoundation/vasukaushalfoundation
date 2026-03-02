/* ===============================
   FILTER SYSTEM (Month + Column)
================================ */

let sheetData = [];
let currentData = [];

// DATA LOAD hone ke baad ye 2 variables set hone chahiye:
// sheetData = data;
// currentData = sheetData;

// Month + Column Combined Filter
function applyFilters() {

  const month = document.getElementById("monthSelect")?.value || "";
  const col = document.getElementById("columnSelect")?.value || "";
  const val = document.getElementById("valueSelect")?.value || "";

  currentData = sheetData.filter(row => {

    // 🔹 Month Filter
    if (month !== "") {
      let dob = Object.values(row)[7];
      if (!dob) return false;
      let d = new Date(dob);
      if (isNaN(d) || d.getMonth() != month) return false;
    }

    // 🔹 Column Filter
    if (col !== "" && val !== "") {
      if (String(Object.values(row)[col]) !== val) return false;
    }

    return true;
  });

  renderTable(currentData);
  processDashboard(currentData);
}


/* ===============================
   RESET
================================ */

function resetAll() {
  currentData = sheetData;

  if(document.getElementById("monthSelect"))
    document.getElementById("monthSelect").value = "";

  if(document.getElementById("columnSelect"))
    document.getElementById("columnSelect").value = "";

  if(document.getElementById("valueSelect"))
    document.getElementById("valueSelect").innerHTML =
      '<option value="">Select Value</option>';

  renderTable(currentData);
  processDashboard(currentData);
}


/* ===============================
   CSV DOWNLOAD (Excel Friendly)
================================ */

function downloadCSV() {

  if (!currentData || currentData.length === 0) {
    alert("No Data To Download");
    return;
  }

  let csv = "";
  let headers = Object.keys(currentData[0]);
  csv += headers.join(",") + "\n";

  currentData.forEach(row => {

    let line = Object.values(row).map(value => {

      // Date Format Fix
      if (typeof value === "string" && value.includes("T") && value.includes("Z")) {
        let d = new Date(value);
        if (!isNaN(d)) {
          let day = String(d.getDate()).padStart(2, '0');
          let month = String(d.getMonth() + 1).padStart(2, '0');
          let year = d.getFullYear();
          return `"${day}-${month}-${year}"`;
        }
      }

      return `"${value || ""}"`;

    }).join(",");

    csv += line + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Filtered_Data.csv";
  link.click();
}
