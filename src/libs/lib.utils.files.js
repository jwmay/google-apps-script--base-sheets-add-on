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
 * Returns an object of valid and invalid file arrays. An array of file objects
 * returned from the Goolge Picker API is the required input.
 * 
 * @param {array} files An array of file objects returned from Google Picker.
 * @param {string} fileType The MIME-type for valid files.
 * @returns An object of valid, invalid, and renamed file arrays.
 */
function validateFiles(files, fileType) {
  // Storage for valid, invalid, and renamed files.
  var validatedFiles = {
    valid: [],
    invalidName: [],
    invalidType: [],
    renamed: []
  };

  // Validate file types and store valid and invalid files.
  var validatedFileTypes = validateFileTypes(files, fileType);
  validatedFiles.valid = validatedFileTypes.valid;
  validatedFiles.invalidType = validatedFileTypes.invalid;

  // Get valid filename regex pattern from configuration.
  var config = Configuration.getCurrent();
  var validFilename = config.validFilename;
  
  // Validate file names and store valid and invalid files.
  var validFilenames = [];
  var invalidFilenames = [];
  for (var i = 0; i < validatedFiles.valid.length; i++) {
    var file = validatedFiles.valid[i];

    var filenameRegex = new RegExp(validFilename);
    var filenameMatch = filenameRegex.exec(file.name);
    var filename = filenameMatch !== null ? filenameMatch[1] : null;

    if (filename !== null) {
      validFilenames.push(file);
    } else {
      invalidFilenames.push(file);
    }
  }
  validatedFiles.valid = validFilenames;
  validatedFiles.invalidName = invalidFilenames;

  return validatedFiles;
}


/**
 * Returns an object of arrays that contain files with valid filetypes and
 * files with invalid filetypes.
 * 
 * @param {array} files An array of file objects returned from Google Picker.
 * @param {string} fileType The MIME-type for valid files.
 * @returns An object of valid and invalid file arrays.
 */
function validateFileTypes(files, fileType) {
  // Create storage object for valid and invalid files.
  var validatedFiles = {
    valid: [],
    invalid: []
  };
  
  // Filter out files with a valid filetype.
  validatedFiles.valid = files.filter(function(file) {
    return file.mimeType === fileType;
  });
  
  // Filter out files with an invalid filetype.
  validatedFiles.invalid = files.filter(function(i) {
    return validatedFiles.valid.indexOf(i) < 0;
  });
  
  return validatedFiles;
}