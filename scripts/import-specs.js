'use strict';

/*
USAGE: node import-specs.js <testName>

where <testName> is the name of a directory inside of dogescript/tests that has:
1) expect.js
2) source.djs

You may also import all tests with import-specs.js --all. Any folders that do not
meet the above requirements will be omitted and no validation errors will be thrown
*/

var fs = require('fs');
var path = require('path');
var walk = require('walk');
var beautify = require('js-beautify').js_beautify;
var dogescript = require('dogescript');

// deal with CRLF from windows folks writing javascript :(
function readCleanCRLF(fpath) {
  return fs.readFileSync(fpath, 'utf8')
    .trim()
    .replace(/\r\n/gm, '\n');
}

// Pop a directory off it's path (os safe)
function dotdotSlash(filePath) {
  var str;
  if (filePath.indexOf('/') == -1) { // windows
    str = filePath.substring(0, filePath.lastIndexOf('\\'));
  }
  else { // unix
    str = filePath.substring(0, filePath.lastIndexOf('/'));
  }

  return str + '/'
}

function getFolderName(filePath) {
  if (filePath.indexOf('/') == -1) { // windows
    return filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
  }
  else { // unix
    return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
  }
}

// Where dogescript tests exists
var relDogescriptPath = 'node_modules/dogescript/test';
var relManifestPath = 'assets/';
var testDataPath      = dotdotSlash(__dirname) + relManifestPath;
var dogeTestPath      = dotdotSlash(__dirname) + relDogescriptPath;
var options           = { followLinks: true }; // follow symlinks

if (process.argv.length < 3) {
  console.log('Usage: ' + getFolderName(process.argv[1]) + ' <testFolder>\n')
  console.log(
    'Where <testFolder> is a directory containing expect.js and source.djs within\n'
  );

  console.log(dogeTestPath + '\n')
  process.exit(0)
}

// Make sure the test directory exists
if (!fs.existsSync(dogeTestPath)){
  throw 'Tests directory not found, please connect your developmental build of dogescript with: \nnpm link <PATH_TO_DOGESCRIPT>'
}

function writeTestData(fPath, data) {
  var string = JSON.stringify(data);

  fs.truncate(fPath, 0, function() {
    fs.writeFile(fPath, string, function (err) {
      if (err) return console.log('Error writing file: ' + err);
    });
  });
}

// Grab the test name
var testFolder = process.argv[process.argv.length - 1];

var testDirs = {};
function handleErrors(testDirs) {
  var isGlob = testFolder === '--all';
  var dirs   = Object.keys(testDirs);

  if (dirs.length === 0) {
    throw 'Could not find a test folder named ' + testFolder;
  }

  const errorStr = dirs.map(d => {
    var err = ''
    if (testDirs[d].missingExpectFile) {
      err += '\nCould not find a test folder named ' + testFolder + ' containing expect.js';
    } else if (testDirs[d].missingSourceFile) {
      err += '\nCould not find a test folder named ' + testFolder + ' containing source.djs';
    }

    // Consume errors for folders that may not fit our shape, delete them instead
    if (isGlob && err.length > 0) {
      delete testDirs[d];
      return '';
    }

    return err;
  }).join('');

  if (errorStr.length > 0) throw errorStr;
}

// Who's your daddy and what does he do?
var skywalker = walk.walk(dogeTestPath, options);

// Walk every folder in the file tree adding any folders that;
// folder name is equal to args[2], have an expect.js, and have a source.js
skywalker.on('names', function(fpath, children) {
  if (getFolderName(fpath) === 'server.js') console.log(fpath);
  var isGlob            = testFolder === '--all';
  var foundFolder       = getFolderName(fpath) === testFolder || isGlob;
  var missingExpectFile = children.indexOf('expect.js') === -1;
  var missingSourceFile = children.indexOf('source.djs') === -1;

  if (!foundFolder) return;

  testDirs[fpath] = { missingExpectFile, missingSourceFile };
});

skywalker.on('end', function() {
  handleErrors(testDirs)

  let fObj = {}
  var keys = Object.keys(testDirs);
  keys.forEach(dir => {
    var testFilePath   = path.join(dir, 'expect.js');
    var sourcePath     = path.join(dir, 'source.djs');

    var testFile = readCleanCRLF(testFilePath);
    var source   = readCleanCRLF(sourcePath);
    const actual = dogescript(source, true);
    var json     = {
      name: getFolderName(dir),
      source: source,
      expected: testFile,
      actual: actual,
      passed: actual === testFile,
    };

    fObj[json.name] = json;
    process.stdout.write(".");
    // console.log(relDogescriptPath + '/.../' + json.name + ' => ' + fPath)
  });

  const fPath = relManifestPath + 'test-manifest.json';
  writeTestData(fPath, fObj);

  console.log('\nSuccessfully imported ' + keys.length + ' specs.')
});
