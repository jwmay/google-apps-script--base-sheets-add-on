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
 * Update the HTML of the #result div to show the given display. 
 * 
 * @param {string} display The HTML to display.
 */
function updateDisplay(display) {
  document.getElementById('result').innerHTML = display;
}


/**
 * Update the user display to show loading message.
 */
function showLoading(message) {
  var msg = message || 'Working...';
  updateDisplay('<em>' + msg + '</em>');
}


/**
 * Displays an error message within the #result element.
 *
 * @param {string} message The error message to display.
 */
function showError(message) {
  document.getElementById('result').innerHTML = '<h4 class="error">ERROR</h4>' +
          message;
  document.getElementById('result').className = 'error';
}


/**
 * Returns and HTML-formatted string to display the 'Close' button.
 */
function closeButton() {
  button = '<input type="button" value="Close" class="btn" onclick="google.script.host.close();">';
  return button;
}


/**
 * Returns the value of a field with the specified selector.
 * 
 * @private
 * @param {string} selector The input selector.
 * @returns A string representing the user's response.
 */
function getValue_(selector) {
  var inputValue = $(selector).val();
  return inputValue;
}


/**
 * Returns the values of all fields with the specified selector.
 * 
 * @private
 * @param {string} selector The input selector.
 * @returns An array of strings representing the user's response for each
 *     field with the given selector.
 */
function getValues_(selector) {
  var inputValues = [];
  $(selector).each(function() {
    inputValues.push($(this).val());
  });
  return inputValues;
}


/**
 * Returns an array of values of checked inputs.
 *
 * @private
 * @param {string} name The name attribute of the checkboxes.
 * @return {array} An array of values of checked inputs.
 */
function getCheckedBoxes_(name) {
  var selector = 'input[name="' + name + '"]:checked';
  var checked = [];
  $(selector).each(function() {
    checked.push($(this).val());
  });
  return checked;
}


/**
 * Returns an array of booleans representing the status of each checkbox
 * with the given name.
 * 
 * @param {string} name The name attribute of the checkboxes.
 * @returns An array of booleans.
 */
function getCheckboxStatus_(name) {
  var selector = 'input[name="' + name + '"]';
  var status = [];
  $(selector).each(function() {
    status.push($(this).prop('checked'));
  });
  return status;
}