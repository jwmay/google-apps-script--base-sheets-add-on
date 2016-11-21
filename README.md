# Baseline Framework for a Google Sheets Add-on 
A baseline framework for a Google Sheets add-on. Includes
modules with helper classes for using Google Apps Scripts
objects.

This project is setup using the npm-google-apps-script package
and gulp.js for local development with compliling and pushing
to Google servers for testing and deployment.

## Initialize a New project
1. After cloning the repository you will need to install the npm dependnecies
by running `npm install` in the root directory of the project.
2. Then create a new Google Apps Script project and copy the file id.
3. In the build/env folder (where env can be dev, tst, or prd), initialize the
project by running `gapps init [file_id]`, where `file_id` is the apps script
file id obtained in step 2.