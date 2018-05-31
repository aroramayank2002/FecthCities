
const bunyan = require("bunyan");
const bformat = require("bunyan-format");
const formatOut = bformat({ outputMode: "short" });
const fs = require("fs");

let startTime = new Date().getTime();

// info, debug, trace
let log = bunyan.createLogger({
    name: "Test-generateExchangeRates",
    stream: formatOut,
    level: "info"
});

const USER_DATA_FILE = "./data-generated/user_data.csv";
const EXCHANGE_RATE_FILE = "./data-generated/exchange_rate.csv";

var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("./data-static/currency_exchange_rate.csv")
});

function removeFile() {
    return new Promise(function (resolve, reject) {
        log.info(`Removing file ${USER_DATA_FILE}`);
        try {
            fs.unlinkSync(USER_DATA_FILE);
            resolve();
        } catch (err) {
            log.warn(`File does not exist: ${USER_DATA_FILE}`);
            resolve();
        }
    });
}

function saveToUSerDataFile(text) {
    fs.appendFile(USER_DATA_FILE, text, function (err) {
        if (err) {throw err; }
        // log.info(`Saved! ${text}`);
    });
}

function start() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

start()
.then(() => {
    return removeFile();
})
.then(() => {
    return saveToUSerDataFile("Name,Surname,Address,City,Telephone,Email,DateOfBirth,Sex,MaritalStatus,Nationality,CountryOfBirth,GrossAnnualIncome,Currency");
});
