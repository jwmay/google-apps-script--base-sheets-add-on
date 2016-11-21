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
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}


/**
 * Create a new sheet for each selected CSV file containing the imported data.
 * Also performs validation that selected files have the correct mime-type and
 * will not conflict with existing sheet names.
 * 
 * @param {array} docs An array of JSON objects returned by Google Picker
 *     representing the selected files.
 * @return {string} A string representing the selected files for user display.
 */
function loadSelectedFiles(files) {
  var masteryTracker = new MasteryTracker();

  // Filter the incoming files to select only csv files.
  var validatedFiles = validateFiles(files, 'text/csv');

  for (var i = 0; i < validatedFiles.valid.length; i++) {
    var file = validatedFiles.valid[i];
    
    // Incoming sheet cannot have same name as an existing sheet.
    // Append a number to the end of the new, duplicate sheet name
    // to make it unique.
    if (masteryTracker.hasSheet(file.name)) {
      file.sheetName = masteryTracker.getUniqueSheetName(file.name);
      validatedFiles.renamed.push(file);
    }
    var sheetId = importCsvFile(file);
  }

  // Generate the diplay of imported, renamed, and invalid files.
  importedFiles = displayPickerResults(validatedFiles);
  return importedFiles;
}


/**
 * Construct an HTML string for display showing the the selected files with
 * links to each file, the invalid files, and the files that were renamed.
 * 
 * @param {object} files An object containing arrays of file objects for valid,
 *     invalid, and renamed files.
 * @return {string} An HTML-formatted string representing the selected files
 *     for user display.
 */
function displayPickerResults(files) {
  var display = [];

  // Display valid and imported files.
  display.push(displayFiles_(
      files.valid,
      'The following files were successfully imported:',
      'msg msg-success',
      displayFileWithLink_));

  // Display renamed files.
  display.push(displayFiles_(
      files.renamed,
      'The following files were renamed because a sheet with that name ' +
          'already exists in this spreadsheet:',
      'msg msg-warning',
      displayRenamedFile_));

  // Display invalid filename files.
  display.push(displayFiles_(
      files.invalidName,
      'The following files do not have a valid file name and ' +
          'were not imported:',
      'msg msg-error',
      displayFileWithLink_));

  // Display invalid filetype files.
  display.push(displayFiles_(
    files.invalidType,
    'The following files are not valid csv files and were not imported:',
    'msg msg-error',
    displayFileWithLink_));
  
  // Display close button.
  display.push('<div class="msg msg-information">' +
        'You may close this window.' +
      '</div>' +
      showCloseButton());
  
  return display.join('');
}


/**
 * Returns an HTML-formatted string of files for display.
 * 
 * @private
 * @param {array} files An array of JSON objects returned by Google Picker
 *     representing the selected files.
 * @param {string} message A message to be displayed with the files.
 * @param {string} cssClass A formatting class for the displayed files.
 * @param {function} formatter A function that returns an HTML-formatted
 *     string of an individual file.
 * @returns An HTML-formatted string containing the file display.
 */
function displayFiles_(files, message, cssClass, formatter) {
  var output = [];
  if (files.length > 0) {
    output.push('<div class="' + cssClass + '">');
    output.push(message);
    output.push('<ol>');
    for (var i = 0; i < files.length; i++) {
      output.push(formatter(files[i]));
    }
    output.push('</ol></div>');
  }
  return output.join('');
}


/**
 * Returns an HTML-formatted string of a single file for display.
 * 
 * @private
 * @param {object} file The file object to be displayed.
 * @returns An HTML-formatted string for displaying a linked file name.
 */
function displayFileWithLink_(file) {
  return Utilities.formatString(
    '<li><b>Filename: </b><a href="%s">%s</a></li>',
    file.url, file.name
  );
}


/**
 * Returns an HTML-formatted string of a single renamed file for display.
 * 
 * @private
 * @param {object} file The file object to be displayed.
 * @returns An HTML-formatted string for displaying a linked file name with
 *     its new sheet name.
 */
function displayRenamedFile_(file) {
  return Utilities.formatString(
    '<li>File <a href="%s">%s</a> was renamed to %s in the current spreadsheet</li>',
    file.url, file.name, file.sheetName
  );
}