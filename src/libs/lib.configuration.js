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


var Configuration = {
  /**
  * Returns the default global settings object. If a developer has added
  * function 'provideEnvironmentConfiguration_(globals)' to their project, that
  * will be added to the global namespace, and will be visible here to allow
  * the dev to set specific values for their run.
  * 
  * @return {myproj.json.Configuration}
  */
  getCurrent: function() {
    if (typeof getDefaultConfiguration_ === 'undefined') {
      throw 'You must provide an implementation of getDefaultConfiguration_' +
          'to use this configuration library.';
    }
    var defaultConfiguration = getDefaultConfiguration_();
    if (typeof provideEnvironmentConfiguration_ !== 'undefined') {
      return provideEnvironmentConfiguration_(defaultConfiguration);
    } else {
      return defaultConfiguration;
    }
  },

  /**
   * Returns an array of strings containing the sheet names defined in the
   * configuration object.
   * 
   * @return {array} An array of strings.
   */
  getSheetNames: function() {
    var config = this.getCurrent();
    var configSheets = config.sheets;
    var configSheetNames = [];
    for (var sheet in configSheets) {
      configSheetNames.push(configSheets[sheet].name);
    }
    return configSheetNames;
  }
};