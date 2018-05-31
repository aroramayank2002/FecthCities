"use strict";

const bunyan = require("bunyan");
const bformat = require("bunyan-format");
const formatOut = bformat({ outputMode: "short" });
const domParser = require("dom-parser");
const fs = require("fs");

const CITIES_FILE = "./data-generated/cities.txt";
let counter = 0;
let BASE_URL = "https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_";
let startTime = new Date().getTime();

// Reference:
// https://www.npmjs.com/package/dom-parser
// Command to execute .\node_modules\.bin\wdio conf\chrome.js
// Time to execute: 12 Seconds

// info, debug, trace
let log = bunyan.createLogger({
    name: "Test-getCities",
    stream: formatOut,
    level: "info"
});

describe("Fetch cities from wiki", function (done) {
    this.timeout(0);
    // this.retries(0);
    let charArray = [];

    function getCharArray() {
        let startAscii = "A".charCodeAt(0);
        let endAscii = "Z".charCodeAt(0);
        for (let i = startAscii; i <= endAscii; i++) {
            charArray.push(String.fromCharCode(i));
        }
        return charArray;
    }

    function saveToFile(text) {
        fs.appendFile(CITIES_FILE, text, function (err) {
            if (err) {throw err; }
            // log.info(`Saved! ${text}`);
        });
    }

    before(() => {
        log.info(`Removing file ${CITIES_FILE}`);
        try {
            fs.unlinkSync(CITIES_FILE);
        } catch (err) {
            log.warn(`File does not exist: ${CITIES_FILE}`);
        }
    });

    function lit(title, testCode) {
        const wrappedTestCode = function () {
            try {
                testCode();
            } catch (error) {
                log.error(error);
                throw new Error(`Failed on test: ${title}`);
            }
        };
        return it(title, wrappedTestCode);
    }

    lit("Get city list in file", function () {
        log.info("Get city list in file");

        let arr = getCharArray();
        for (let k = 0; k < arr.length; k++) {
            let launchUrl = BASE_URL + arr[k];
            log.info(launchUrl);
            browser.url(launchUrl);
            // browser.pause(3000);
            var xmlString = browser.element(".wikitable").getHTML();
            let parser = new domParser();
            let tableDom = parser.parseFromString(xmlString, "text/xml");
            let trDom = tableDom.getElementsByTagName("tr");

            // Skipping first row as its 'City' heading
            for (var i = 1; i < trDom.length; i++) {
                let city = trDom[i].getElementsByTagName("td")[0].textContent;
                let country = "";
                if (trDom[i].getElementsByTagName("td")[1]) {
                    country = trDom[i].getElementsByTagName("td")[1].textContent;
                }

                country = country.replace(new RegExp("&nbsp;", "g"), "");
                log.info(`${city},${country}`);
                saveToFile(`${city},${country}\n`);
                counter++;
            }
            log.info(`Saved ${counter} cities.`);
        }
        log.info(`Time to test (sec): ${(new Date().getTime() - startTime) / 1000}`);
    });
});
