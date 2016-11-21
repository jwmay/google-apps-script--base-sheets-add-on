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
 * Called when an add-on is installed.
 * @param {object} e Apps Script onInstall event object
 */
function onInstall(e) {
  onOpen(e);
}


/**
 * Called when a spreadsheet that is associated with this add-on is opened.
 * @param {object} e Apps Script onInstall event object
 */
function onOpen(e) {
  // Add the plugin add-on menu to the user interface.
  SpreadsheetApp.getUi()
      .createMenu('My Project')
      .addItem('Start', 'onShowSidebar')
      .addToUi();
  
  // Show the sidebar when the spreadsheet opens.
  onShowSidebar();
}


/**
 * Displays an HTML Service sidebar in Google Sheets.
 */
function onShowSidebar() {
  showSidebar('a.my-project.sidebar.view','My Project');
}