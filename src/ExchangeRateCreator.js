
const bunyan = require("bunyan");
const bformat = require("bunyan-format");
const formatOut = bformat({ outputMode: "short" });
const fs = require("fs");

// info, debug, trace
let log = bunyan.createLogger({
    name: "Test-generateExchangeRates",
    stream: formatOut,
    level: "info"
});

const EXCHANGE_RATE_FILE = "./data-generated/exchange_rate.csv";

var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("./data-static/currency_exchange_rate.csv")
});

let currArray = [];

function removeFile() {
    return new Promise(function (resolve, reject) {
        log.info(`Removing file ${EXCHANGE_RATE_FILE}`);
        try {
            fs.unlinkSync(EXCHANGE_RATE_FILE);
            resolve();
        } catch (err) {
            log.warn(`File does not exist: ${EXCHANGE_RATE_FILE}`);
            resolve();
        }
    });
}


function saveToFile(text) {
    fs.appendFile(EXCHANGE_RATE_FILE, text, function (err) {
        if (err) {throw err; }
        // log.info(`Saved! ${text}`);
    });
}

function createExchangeRates() {
    return lineReader.on("line", function (line) {
      // log.info("Line from file:", line);
        line = line.trim();
        if (line.trim().length === 0) {
            log.info("Empty line found");
        } else if (line.trim().startsWith("#")) {
            log.info(`Comment line found: ${line}`);
        } else {
            let currency = line.split(",")[0];
            // log.info(line.split(",")[0]);
            if (!currArray.includes(currency)) {
                currArray.push(currency);
                log.info(line);
                saveToFile(line + "\n");
            }
        }
    });
}

removeFile().then(() => {
    createExchangeRates();
})
