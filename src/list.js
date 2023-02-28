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

const logRoot         = "cypress/logs/";
const videoRoot       = "cypress/videos/";
const screenshotsRoot = "cypress/screenshots";
const specRoot        = "cypress/e2e/";

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

const theList   = "list.txt";
var theFiles = [];

( async () => {

    if ( fs.existsSync(theList) ) fs.unlinkSync(theList);

    await readLocalFiles(logRoot, theFiles);
    for (var file of theFiles) {
        if (file["extension"] === '.json') {
            let jsonContent = JSON.parse(fs.readFileSync(file["path"], 'utf-8'));

            let testFilePath      = Object.keys(jsonContent)[0]; // only 1 key in json file
            let testFilePathLinux = testFilePath.replace(/\\/g, "/");
            let folderAndFile     = testFilePathLinux.split(specRoot)[1];
            let splitFolderFile   = folderAndFile.split("/");

            let testFolder        = splitFolderFile[0];
            let testFile          = splitFolderFile[1];
            let logFile           = testFile.replace("js", "txt");
            let videoFile         = testFile+".mp4";
            let testSuiteWithCase = Object.keys(jsonContent[testFilePath])[0];
            let testSuite         = testSuiteWithCase.split(" ->")[0];
            console.log(testFolder, testFile, testSuite);

            var logRecord = '"['+testFolder+'/'+testSuite+']+'+logRoot+testFolder+'/'+logFile+'{log}"\n';
            fs.appendFileSync(theList, logRecord);
            var videoRecord = '"['+testFolder+'/'+testSuite+']+'+videoRoot+testFolder+'/'+videoFile+'{video}"\n';
            fs.appendFileSync(theList, videoRecord);
            var pngFolder = screenshotsRoot+"/"+testFolder+"/"+testFile;
            if ( fs.existsSync(pngFolder) ) {
                var imageFiles = [];
                await readLocalFiles(pngFolder, imageFiles);
                for (var imageFile of imageFiles) {
                    var imageRecord = '"['+testFolder+'/'+testSuite+']+'+imageFile["path"]+'{image}"\n';
                    fs.appendFileSync(theList, imageRecord);
                }
            }
        }
    }
}) ();

