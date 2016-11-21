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

var SPREADSHEET_ID = '1JgQre88MIRf083P3IoPaGUtqMqDZiF2Ln4TdLbSQSB8';
var SPREADSHEET_NAME = '[TST] PLC Data Analyzer - ' +
                       'Teacher Mastery Tracker - ' +
                       'PLC Grade Importer';
var TEST_EMAIL = 'mayj3@nv.ccsd.net';


/**
 * Base class for testing the Spreadsheet library.
 */
var BaseSpreadsheetTests = function() {
  Tests.call(this);
};
inherit_(BaseSpreadsheetTests, Tests);


/**
 * Test to confirm that the configurations are properly loaded.
 */
BaseSpreadsheetTests.prototype.testConfigLoad = function() {
  var actualSpreadsheetId = SPREADSHEET_ID;
  var testSpreadsheet = new BaseSpreadsheet();
  var testSpreadsheetId = testSpreadsheet.config.debugSpreadsheetId;
  assertEquals_(actualSpreadsheetId, testSpreadsheetId);
};


/**
 * Test to confirm that the active spreadsheet is loaded.
 */
BaseSpreadsheetTests.prototype.testSpreadsheetLoad = function() {
  var actualSpreadsheetName = SPREADSHEET_NAME;
  var testSpreadsheet = new BaseSpreadsheet().getSpreadsheet();
  var testSpreadsheetName = testSpreadsheet.getName();
  assertEquals_(actualSpreadsheetName, testSpreadsheetName);
};


/**
 * Test to confirm that the sheet names are collected.
 */
BaseSpreadsheetTests.prototype.testGetSheetNames = function() {
  var actualSheetNames = [
    'Class Schedule',
    'Mastery Data',
    'Mastery Tracker',
    'Constants'
  ];
  var testSpreadsheet = new BaseSpreadsheet();
  var testSheetNames = testSpreadsheet.getSheetNames();
  assertEqualsArray_(actualSheetNames, testSheetNames, true);
};


/**
 * Test to confirm that the given sheet name is found in the spreadsheet.
 */
BaseSpreadsheetTests.prototype.testHasSheet = function() {
  var sheetName = 'Class Schedule';
  var testSpreadsheet = new BaseSpreadsheet();
  assertTrue_(testSpreadsheet.hasSheet(sheetName),
          'The sheet was not found in the spreadsheet.');
};


/**
 * Test to confirm that the currentUserIsOwner method correctly identifies
 * the email address of the current user and spreadsheet owner.
 */
BaseSpreadsheetTests.prototype.testCurrentUserIsOwner = function() {
  var testSpreadsheet = new BaseSpreadsheet();
  assertTrue_(testSpreadsheet.currentUserIsOwner(),
          'The current user is not the owner.');
};


/**
 * Test to confirm that the getSheetById method correclty selects the sheet
 * wit the given sheetId.
 */
BaseSpreadsheetTests.prototype.testGetSheetById = function() {
  var actualSheetName = 'Class Schedule';
  var actualSheetId = 680820455;
  var testSpreadsheet = new BaseSpreadsheet();
  var testSheet = testSpreadsheet.getSheetById(actualSheetId);
  var testSheetName = testSheet.getName();
  assertEquals_(actualSheetName, testSheetName);
};


/**
 * Test to confirm that the getUniqueSheetName method provides a correct
 * sheet name for a new sheet with the same name as an existing sheet.
 */
BaseSpreadsheetTests.prototype.testGetUniqueSheetName = function() {
  var baseName = 'Class Schedule';
  var actualSheetName = 'Class Schedule (2)';
  var testSpreadsheet = new BaseSpreadsheet();
  var testSheetName = testSpreadsheet.getUniqueSheetName(baseName);
  assertEquals_(actualSheetName, testSheetName);
};