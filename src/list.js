/**
 * @name list
 *
 * @desc Content List generated for publishing. Using the "json" logs to create the list.txt content file.
 *
 * @assumptions Each test file contains: .json, .txt, .mp4 files, and optionally .png files.
 *
 **/

const fs = require('fs');
const path = require("path");

/**
 * Configuration
 *
 **/

const logRoot         = "./cypress/logs/";
const videoRoot       = "./cypress/videos/";
const screenshotsRoot = "./cypress/screenshots";

const specRoot  = "cypress\\e2e\\";

/**
 * Returns list of Files. Note a "recursive" routine
 *
 **/
async function readLocalFiles(dir,theFiles) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const stats = fs.statSync(`${dir}/${file}`);
        if (stats.isFile()) {
            var extension = path.extname(`${dir}/${file}`);
            var aFile = {}
            aFile["path"]       = `${dir}/${file}`;
            aFile["extension"]  = extension;
            theFiles.push(aFile);
        } else if (stats.isDirectory()) {
            readLocalFiles(`${dir}/${file}`,theFiles);
        }
    });
}

//var logDir   = "./cypress/logs/1-getting-started";
//var logDir      = "./cypress/logs";
const theList   = "list.txt";
var theFiles = [];

( async () => {

    if ( fs.existsSync(theList) ) fs.unlinkSync(theList);

    await readLocalFiles(logRoot, theFiles);
    //console.log("Files: ", theFiles);

    for (var file of theFiles) {
        if (file["extension"] === '.json') {
            let jsonContent = JSON.parse(fs.readFileSync(file["path"], 'utf-8'));

            let testFilePath      = Object.keys(jsonContent)[0]; // only 1 key in json file
            let folderAndFile     = testFilePath.split(specRoot)[1];
            let splitFolderFile   = folderAndFile.split("\\");
            let testFolder        = splitFolderFile[0];
            let testFile          = splitFolderFile[1];
            let logFile           = testFile.replace("js", "txt");
            let videoFile         = testFile+".mp4";
            let testSuiteWithCase = Object.keys(jsonContent[testFilePath])[0];
            let testSuite         = testSuiteWithCase.split(" ->")[0];
            console.log(testFolder, testFile, testSuite);

            /*
            console.log("  Path:      ", testFilePath);
            console.log("  Folder:    ",  testFolder);
            console.log("  testFile:  ",  testFile);
            console.log("  logFile:   ",  logFile);
            console.log("  videoFile: ",  videoFile);
            console.log("  Suite:     ",  testSuite);
            console.log("");
            */

            var lRecord = '"['+testFolder+'/'+testSuite+']+'+logRoot+testFolder+'/'+logFile+'{log}"\n';
            fs.appendFileSync(theList, lRecord);
            var vRecord = '"['+testFolder+'/'+testSuite+']+'+videoRoot+testFolder+'/'+videoFile+'{video}"\n';
            fs.appendFileSync(theList, vRecord);
            var pngFolder = screenshotsRoot+"/"+testFolder+"/"+testFile;
            if ( fs.existsSync(pngFolder) ) {
                var imageFiles = [];
                await readLocalFiles(pngFolder, imageFiles);
                for (var iFile of imageFiles) {
                    var iRecord = '"['+testFolder+'/'+testSuite+']+'+iFile["path"]+'{image}"\n';
                    fs.appendFileSync(theList, iRecord);
                }
            }
        }
    }
}) ();

