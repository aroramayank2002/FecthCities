// node .\poc\LineReader.js
var path = require("path");
var LineReader = require("node-line-reader").LineReader;

// var reader = new LineReader(path.join('C:/Users/mayank1568/Google Drive/QA/FecthCities/data-generated', 'cities.txt'));
var reader = new LineReader(path.join(`${__dirname}/../data-generated/`, "cities0.txt"));

// Each execution of nextLine will get a following line of text from the input file
function getNextLine() {
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

getNextLine()
.then((value) => {
    console.log(`Line: ${value}`);
    return getNextLine();
})
.then((value) => {
    console.log(`Line: ${value}`);
    return getNextLine();
})
.then((value) => {
    console.log(`Line: ${value}`);
    return getNextLine();
})
.then((value) => {
    console.log(`Line: ${value}`);
}).
catch((error) => {
    console.log(error);
});
