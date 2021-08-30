const { GoogleSpreadsheet } = require("google-spreadsheet");
const {
  SHEETS_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
} = require("../env");

async function AddRow2GoogleSheets(payload) {
  const doc = new GoogleSpreadsheet(SHEETS_ID);
  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  sheet.setHeaderRow([
    "date",
    "telegram_user_id",
    "username",
    "first_name",
    "msg",
  ]);
  await sheet.addRow(payload);
}

module.exports = {
  AddRow2GoogleSheets,
};
