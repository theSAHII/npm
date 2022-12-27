"use strict"
const { join } = require("path")

const { google } = require("googleapis"),
    auth = new google.auth.GoogleAuth({
        keyFile: join(__dirname, "./spreadsheet-api.json"),
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    }),
    spreadsheetId = "1S6yERKSnCcYELX18mvtMVgJWYreAVoQ_W4sgcDo-fZ8"  // spread sheet ID


let client, instance_of_google_sheet_api, gsheet_Initiated = false;

async function init_gsheetAPI() {
    client = await auth.getClient()

    instance_of_google_sheet_api = google.sheets({ version: "v4", auth: client })

    gsheet_Initiated = true
}

async function getRange(range) {

    if (!gsheet_Initiated || !instance_of_google_sheet_api) await init_gsheetAPI();

    return await instance_of_google_sheet_api.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: range
    })
        .then(response => response.data)
        .then(data => {
            return data.values
        })
}

async function setRange(range, value) {

    if (!gsheet_Initiated || !instance_of_google_sheet_api) await init_gsheetAPI();

    return await instance_of_google_sheet_api.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: {
            majorDimension: "ROWS", // Added
            values: value,
        }
    })
        .then(response => response.data)
        .then(data => {
            return data.values
        })
}

async function appendData(range, value) {

    if (!gsheet_Initiated || !instance_of_google_sheet_api) await init_gsheetAPI();

    return await instance_of_google_sheet_api.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: {
            majorDimension: "ROWS", // Added
            values: value,
        }
    })
        .then(response => response.data)
        .then(data => {
            return true
        })
}

module.exports = {
    init_gsheetAPI,
    getRange,
    setRange,
    appendData
}
