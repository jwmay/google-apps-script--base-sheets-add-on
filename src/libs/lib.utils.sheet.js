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
 * Base class that assists in working with a Sheet instance in a Spreadsheet.
 * 
 * @constructor
 * @param {string} sheetId The sheet id.
 */
var BaseSheet = function(sheetId) {
  this.config = Configuration.getCurrent();
  this.sheetId = sheetId;
  this.spreadsheet = new BaseSpreadsheet();
  this.sheet = this.spreadsheet.getSheetById(parseInt(sheetId));
  this.sheetName = this.sheet.getSheetName();
};


/**
 * Returns a Range instance representing a row in the sheet. An optional start
 * postion for the column can be providied. If no start column position or
 * number of columns are given, the entire row is returned, regardless of
 * content.
 * 
 * @param {number} rowNum The row to retrieve.
 * @param {number=} startCol An optional starting column postion.
 * @param {number=} numCols An optional number of columns.
 * @return {Range} A Range instance representing the row.
 */
BaseSheet.prototype.getRow = function(rowNum, startCol, numCols) {
  var row = this.getRows(rowNum, 1, startCol, numCols);
  return row;
};


/**
 * Returns a Range instance representing the given number of rows in the sheet.
 * An optional start postion for the column can be providied. If no start
 * column position or number of columns are given, the entire row is returned,
 * regardless of content.
 * 
 * @param {number} rowNum The row to retrieve.
 * @param {number} numRows The number of rows to retrieve.
 * @param {number=} startCol An optional starting column postion.
 * @param {number=} numCols An optional number of columns.
 * @return {Range} A Range instance representing the row.
 */
BaseSheet.prototype.getRows = function(rowNum, numRows, startCol, numCols) {
  var colStart = startCol === undefined ? 1 : startCol;
  var maxCols = this.sheet.getMaxColumns();
  numCols = numCols || (maxCols - colStart + 1);
  var row = this.sheet.getRange(rowNum, colStart, numRows, numCols);
  return row;
};


/**
 * Returns a Range instance representing a column in the sheet. An optional
 * start postion for the row can be providied. If no start position or number
 * of rows are given, the entire row is returned, regardless of content.
 * 
 * @param {number} colNum The column to retrieve.
 * @param {number=} startRow An optional starting row postion.
 * @param {number=} numRows An optional number of rows.
 * @return {Range} A Range instance representing the column.
 */
BaseSheet.prototype.getColumn = function(colNum, startRow, numRows) {
  var col = this.getColumns(colNum, 1, startRow, numRows);
  return col;
};


/**
 * Returns a Range instance representing the given number of columns in the
 * sheet. An optional start postion for the row can be providied. If no start
 * position or number of rows are given, the entire row is returned, regardless
 * of content.
 * 
 * @param {number} colNum The column to retrieve.
 * @param {number} numCols The number of columns to retrieve.
 * @param {number=} startRow An optional starting row postion.
 * @param {number=} numRows An optional number of rows.
 * @return {Range} A Range instance representing the column.
 */
BaseSheet.prototype.getColumns = function(colNum, numCols, startRow, numRows) {
  var rowStart = startRow === undefined ? 1 : startRow;
  var maxRows = this.sheet.getMaxRows();
  numRows = numRows || (maxRows - rowStart + 1);
  var col = this.sheet.getRange(rowStart, colNum, numRows, numCols);
  return col;
};


/**
 * Returns the position of the last row that has content for the given column.
 * 
 * @param {number} colNum The column number.
 * @param {number=} startRow An optional starting row position.
 * @param {number=} numRows An optional number of rows.
 * @return {number} The last row of the column that contains content.
 */
BaseSheet.prototype.getLastRow = function(colNum, startRow, numRows) {
  // Define range parameters.
  var rowStart = startRow === undefined ? 1 : startRow;
  var maxRows = this.sheet.getMaxRows();
  numRows = numRows || (maxRows - rowStart + 1);
  var colValues = this.getColumn(colNum, rowStart, numRows).getValues();
  var colValuesLength = colValues.length;
  
  // Search from the end of the column to the top for the first row with
  // content. Empty elements are removed from the colValues array.
  for (var i = 0; i < colValuesLength; i++) {
    if (colValues[colValuesLength - i - 1][0] === '') {
      colValues.pop();
    } else {
      break;
    }
  }
  return colValues.length;
};


/**
 * Deletes the current sheet.
 */
BaseSheet.prototype.remove = function() {
  var ss = this.spreadsheet.getSpreadsheet();
  ss.deleteSheet(this.sheet);
};