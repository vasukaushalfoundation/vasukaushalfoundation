/* ===============================
   FILTER SYSTEM (Month + Column)
================================ */

let sheetData = [];
let currentData = [];

// 👉 DATA LOAD hone ke baad ye set karo:
// sheetData = data;
// currentData = sheetData;

/* ===============================
   APPLY FILTERS
================================ */

function applyFilters() {

  const month = document.getElementById("monthSelect")?.value || "";
  const col = document.getElementById("columnSelect")?.value || "";
  const val = document.getElementById("valueSelect")?.value || "";

  currentData = sheetData.filter(row => {

    /* 🔹 MONTH FILTER (DOB Index = 7) */
    if (month !== "") {

      let dob = Object.values(row)[7];
      if (!dob) return false;

      let d = new Date(dob);
      if (isNaN(d)) return false;

      if (d.getMonth() != month) return false;
    }

    /* 🔹 COLUMN FILTER */
    if (col !== "" && val !== "") {
      if (String(Object.values(row)[col]) !== val) return false;
    }

    return true;
  });

  renderTable(currentData);
  processDashboard(currentData);
}


/* ===============================
   RESET SYSTEM
================================ */

function resetAll() {

  currentData = sheetData;

  if (document.getElementById("monthSelect"))
    document.getElementById("monthSelect").value = "";

  if (document.getElementById("columnSelect"))
    document.getElementById("columnSelect").value = "";

  if (document.getElementById("valueSelect"))
    document.getElementById("valueSelect").innerHTML =
      '<option value="">Select Value</option>';

  renderTable(currentData);
  processDashboard(currentData);
}


/* ===============================
   TABLE RENDER WITH DOB FORMAT FIX
================================ */

function renderTable(data) {

  const tableBody = document.getElementById("tableBody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  data.forEach(row => {

    let tr = document.createElement("tr");

    Object.values(row).forEach((value, index) => {

      let td = document.createElement("td");

      /* 🔹 DOB FORMAT FIX (Column Index 7) */
      if (index === 7 && value) {
        let d = new Date(value);
        if (!isNaN(d)) {
          let day = String(d.getDate()).padStart(2, '0');
          let month = String(d.getMonth() + 1).padStart(2, '0');
          let year = d.getFullYear();
          value = `${day}-${month}-${year}`;
        }
      }

      td.innerText = value || "";
      tr.appendChild(td);

    });

    tableBody.appendChild(tr);
  });
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

    let line = Object.values(row).map((value, index) => {

      /* 🔹 DOB FIX FOR CSV */
      if (index === 7 && value) {
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
