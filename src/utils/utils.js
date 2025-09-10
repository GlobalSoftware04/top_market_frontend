
const ExcelJS = require("exceljs");
const saveAs = require('file-saver')
const emailPattern = (emailAddress) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailAddress);
}
const phonePattern = (phoneNumber) => {
  const phoneRegex = /^(\+91[-\s]?)?[0]?[6-9]\d{9}$/;
  return phoneRegex.test(phoneNumber);
};
const saveRecentSearch = (linkText, href) => {
  // const linkEl = e.target.closest('a');
  // if (!linkEl) return;

  // const href = linkEl.getAttribute('href');
  // const linkText = linkEl.textContent.trim(); // cleaner text

  let savedVisited = [];

  const getlocalStorageData = localStorage.getItem('recentVisited');
  if (getlocalStorageData) {
    savedVisited = JSON.parse(getlocalStorageData);
    if (savedVisited?.length > 5) {
      savedVisited.splice(0, 1);
    }
  }
  // Optional: check if link already exists to avoid duplicates
  const alreadyExists = savedVisited.some(item => Object.values(item)[0] === href);
  if (!alreadyExists) {
    savedVisited.push({ [linkText.trim()]: href });
  }

  if (savedVisited.length) {
    localStorage.setItem('recentVisited', JSON.stringify(savedVisited));
  }
  return true;
}



const handleExcelDownload = async (excelData) => {
  const dataToExport = excelData.data;
  if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
    alert("warning", "No data available to export.");
    return;
  }
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Escalated Ticket Report");

  const headers = Object.keys(dataToExport[0]);

  // 1️⃣ Add merged title row at the top (row 1)
  worksheet.mergeCells(1, 1, 1, headers.length); // Merge from A1 to last column in row 1
  const titleCell = worksheet.getCell("A1");
  titleCell.value = excelData.title;
  titleCell.font = {
    name: "Arial",
    size: 14,
    bold: true,
    color: { argb: "FFFFFF" },
  };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0000" }, // Red background
  };
  worksheet.getRow(1).height = 25;

  // 2️⃣ Add header row in row 2
  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "000000" }, // Red
    };
    cell.font = {
      color: { argb: "FFFFFF" },
      bold: true,
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    cell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
  });

  // 3️⃣ Add data rows starting from row 3
  dataToExport.forEach((row) => {
    const rowValues = headers.map((header) => row[header]);
    worksheet.addRow(rowValues);
  });

  // 4️⃣ Set column widths and style data rows
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });

  worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    // Skip styling the title (row 1) and headers (row 2) as they are already styled
    if (rowNumber > 2) {
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
      });
    }
  });

  // 5️⃣ Export file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, excelData.fileName);
};

const normalizeStartDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const normalizeEndDate = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


module.exports = { phonePattern, emailPattern, saveRecentSearch, handleExcelDownload, normalizeStartDate, normalizeEndDate, formatDate }