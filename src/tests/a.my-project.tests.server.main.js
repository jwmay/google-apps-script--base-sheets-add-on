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
 * Run all unit tests. 
 */
function runAllTests() {
  var baseSpreadsheetTests = new BaseSpreadsheetTests();
  baseSpreadsheetTests.run();
}


/**
 * Base class for all tests.
 * @constructor
 */
var Tests = function() {
  // Do nothing.
};


/**
 * Runs all member functions in the child class whose names begin with "test".
 */
Tests.prototype.run = function() {
  var testCount = 0;
  var failCount = 0;
  var failNames = [];
  Logger.log('Starting test run.');
  for (var member in this) {
    if ((typeof this[member] !== 'undefined') &&
        (member.indexOf('test') === 0)) {
      try {
        testCount++;
        this[member].call(this);
        Logger.log('[PASS] : ' + member);
      } catch (error) {
        failCount++;
        failNames.push('\t' + member + '\t\t' + error);
        Logger.log('[FAIL] : ' + member + '\n' + error);
      }
    }
  }
  Logger.log(testCount + ' tests completed in this run.');
  Logger.log(failCount + ' tests failed:\n' + failNames.join('\n'));
  Logger.log('');
};