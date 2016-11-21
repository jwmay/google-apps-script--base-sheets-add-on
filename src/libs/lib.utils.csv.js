// Copyright 2016 Joseph W. May. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Write the contents of the CSV file to a new sheet in the
 * active sreadsheet.
 *
 * @param {object} file The file to import as returned by Google Picker.
 * @return {string} The id of the newly created sheet.
 */
function importCsvFile(file) {
  // Get the file contents and convert to an array of arrays.
  var csvFile = DriveApp.getFileById(file.id);
  var fileContents = csvFile.getBlob().getDataAsString();
  var csvData = Utilities.parseCsv(fileContents);

  // Create the new sheet using sheetName, if provided, to avoid
  // duplicate sheet names, otherwise, use the file name as the sheet name.
  var spreadsheet = new BaseSpreadsheet().getSpreadsheet();
  var sheetName = file.sheetName === undefined ? file.name : file.sheetName;
  var sheet = spreadsheet.insertSheet(sheetName);

  // Write the CSV file, row by row, to the new sheet.
  for (var row = 0; row < csvData.length; row++) {
    var range = sheet.getRange(row+1, 1, 1, csvData[row].length);
    range.setValues([csvData[row]]);
  }

  return sheet.getSheetId();
}