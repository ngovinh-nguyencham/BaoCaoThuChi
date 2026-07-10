const SHEET_ID = "1WizjdltVmygKZtMPYOhWkVzdQm7TyqMshm9ne0VdfhU";
const SHEET_NAME = "GiaoDich";

function doGet(e) {

  const year = Number(e.parameter.year || new Date().getFullYear());

  const sheet = SpreadsheetApp
    .openById(SHEET_ID)
    .getSheetByName(SHEET_NAME);

  const values = sheet.getDataRange().getValues();

  const header = values.shift();

  const cNgay = header.indexOf("Ngay");
  const cLoai = header.indexOf("Loai");
  const cTien = header.indexOf("SoTien");

  let months = [];

  for (let i = 0; i < 12; i++) {

    months.push({

      month: i + 1,

      thu: 0,

      chi: 0

    });

  }

  let totalThu = 0;
  let totalChi = 0;

  let years = {};

  values.forEach(r => {

    let d = r[cNgay];

    if (!(d instanceof Date))
      d = new Date(d);

    if (isNaN(d))
      return;

    const y = d.getFullYear();

    years[y] = true;

    if (y != year)
      return;

    const m = d.getMonth();

    const money = Number(r[cTien]) || 0;

    if (String(r[cLoai]).trim() == "Thu") {

      months[m].thu += money;
      totalThu += money;

    }

    else {

      months[m].chi += money;
      totalChi += money;

    }

  });

  const result = {

    year: year,

    years: Object.keys(years)
      .map(Number)
      .sort(),

    summary: {

      thu: totalThu,

      chi: totalChi,

      conlai: totalThu - totalChi

    },

    months: months

  };

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);

}
