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
 * Open a dialog window using an HTML template with the given dimensions.
 * 
 * @param {string} source Name of the HTML template file.
 * @param {integer} width Width of dialog window.
 * @param {integer} height Height of dialog window.
 * @param {string} title Title to display on dialog window.
 */
function showDialog(source, width, height, title) {
  var ui = HtmlService.createTemplateFromFile(source)
      .evaluate()
      .setWidth(width)
      .setHeight(height);
  SpreadsheetApp.getUi().showModalDialog(ui, title);
}


/**
 * Open a sidebar using an HTML template.
 * 
 * @param {string} source Name of the HTML template file.
 * @param {string} title Title to display on sidebar.
 */
function showSidebar(source, title) {
  var ui = HtmlService.createTemplateFromFile(source)
      .evaluate()
      .setTitle(title);
  SpreadsheetApp.getUi().showSidebar(ui);
}


/**
 * Display a prompt and return the user's response.
 * 
 * @param {string} message The message to display.
 * @returns A string representing the user's response, or null if
 *     no response is given.
 */
function showPrompt(message) {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(message);

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    return response.getResponseText();
  } else {
    return null;
  }
}


/**
 * Display an alert with a single OK button.
 * 
 * @param {strong} title The title of the alert.
 * @param {string} message The message to display.
 */
function showAlert(title, message) {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(title, message, ui.ButtonSet.OK);
}


/**
 * Insert any HTML file in the project into an outer HTML file.
 * Called from within the outer HTML file.
 * 
 * @param {String} filename Name of the file in the project.
 *    Do not include ".html".
 * @return {String} HTML markup for the requested file.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


/**
 * Returns an HTML-formatted string of checkboxes for the given value-item
 * objects. The input must be an array of objects each with a value and label
 * property. 
 * 
 * @param {string} name The name for the checkbox group.
 * @param {array} items An array of objects.
 * @param {boolean} allChecked If true, all checkboxes will be initially checked
 *     on display.
 * @returns An HTML-formatted string.
 */
function showCheckboxes(name, items, allChecked) {
  var checkboxes = [];
  var checked = allChecked === true ? ' checked' : '';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    checkboxes.push(
      Utilities.formatString(
        '<div><label><input type="checkbox" name="%s" value="%s"%s>%s</label></div>',
        name, item.value, checked, item.label
      )
    );
  }
  return checkboxes.join('');
}


/**
 * Returns and HTML-formatted string to display the 'Close' button.
 */
function showCloseButton() {
  button = '<input type="button" value="Close" class="btn" onclick="google.script.host.close();">';
  return button;
}


/**
 * Returns the data structure for showCheckboxes() given an array of Sheet
 * objects. The returned data is an array of objects each with a value and
 * label property.
 * 
 * @private
 * @param {array} sheets An array of Sheet objects.
 * @returns An array of objects.
 */
function constructSheetSelectItems_(sheets) {
  var items = [];
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var item = {
        value: sheet.getSheetId(),
        label: sheet.getSheetName()
    };
    items.push(item);
  }
  return items;
}


/**
 * Returns the data structure for showCheckboxes() given an array of strings.
 * The returned data is an array of objects each with a value and label
 * property.
 * 
 * @private
 * @param {array} columns An array of strings.
 * @returns An array of objects.
 */
function constructColumnSelectItems_(columns, startIndex) {
  var items = [];
  var firstIndex = startIndex === undefined ? 1 : startIndex;
  for (var i = 0; i < columns.length; i++) {
    var col = columns[i];
    var colNum = i + firstIndex;
    var item = {
      value: colNum,
      label: col
    };
    items.push(item);
  }
  return items;
}