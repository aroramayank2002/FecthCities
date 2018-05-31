// node .\poc\LineReader.js
const path = require("path");
const LineReader = require("node-line-reader").LineReader;

const FOLDER_DATA_STATIC = `${__dirname}/../data-static/`;
const FILE_NAME_MALE = "names_male.txt";
const FILE_NAME_FEMALE = "names_female.txt";
const FILE_SURNAME = "surname.txt";

const readerNameMale = new LineReader(path.join(FOLDER_DATA_STATIC, FILE_NAME_MALE));
const readerNameFemale = new LineReader(path.join(FOLDER_DATA_STATIC, FILE_NAME_FEMALE));
const readerNameSurname = new LineReader(path.join(FOLDER_DATA_STATIC, FILE_SURNAME));

// Each execution of nextLine will get a following line of text from the input file
function getNextLine(reader) {
    return new Promise((resolve, reject) => {
        reader.nextLine(function (err, line) {
            if (!err) {
            //  console.log('file line: ', line);
                if (line === null) {
                    reject("No_data_found");
                } else {
                    resolve(line);
                }
            } else {
                reject("No_data_found");
            }
        });
    });
}

getNextLine(readerNameFemale)
.then((value) => {
    console.log(`Line: ${value}`);
    return getNextLine(readerNameMale);
})
.then((value) => {
    console.log(`Line: ${value}`);
    return getNextLine(readerNameMale);
})
.then((value) => {
    console.log(`Line: ${value}`);
    return getNextLine(readerNameSurname);
})
.then((value) => {
    console.log(`Line: ${value}`);
}).
catch((error) => {
    console.log(error);
});
