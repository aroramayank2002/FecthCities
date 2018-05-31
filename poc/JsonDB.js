/*
node .\poc\JsonDB.js
1. Reads json
2. Updated json
*/
const db = require("diskdb");
const { URL, URLSearchParams } = require("url");
const bunyan = require("bunyan");
const bformat = require("bunyan-format");
const formatOut = bformat({ outputMode: "short" });

// info, debug, trace
let log = bunyan.createLogger({
    name: "Dealer-Engage",
    stream: formatOut,
    level: "debug"
});

db.connect("./poc/json", ["dealerClient"]);
db.connect("./data-static", ["city_list"]);

function update(dealerUrl1, readUrl1, timeoutMin1) {
    var dealerField = {
        dealerUrl: dealerUrl1,
        readUrl: readUrl1,
        timeoutMin: timeoutMin1
    };

    var options = {
        multi: false,
        upsert: false
    };

    var updated = db.dealerClient.update({ _id: "1" }, dealerField, options);
    log.info("updated data: " + JSON.stringify(updated));
}

function get() {
    var dealerFieldFetched = db.dealerClient.findOne({ _id: "1" });
    log.debug(dealerFieldFetched);
    return dealerFieldFetched;
}

function getTableId(url) {
    log.debug("getTableId,url " + url);
    const myURL = new URL(url);
    let tableId = myURL.searchParams.get("tableId");
    log.debug("table Id: " + tableId);
    return tableId;
}

function getHost(url) {
    log.debug("getHost,url " + url);
    const myURL = new URL(url);
    log.debug("Host: " + myURL.host);
    return myURL.host;
}

function findAll() {
    return db.city_list.find();
}

function count() {
    return db.city_list.count();
}

function find() {
    return db.city_list.find({ country: "IN" });
}

module.exports = {
    update: update,
    get: get,
    getTableId: getTableId,
    getHost: getHost
};

// console.log(getTableId("http://sta-lc-ftcl01-mpp-lb.nix.cydmodule.com/dealerclient/stbjdealerclient.html?tableId=6004&poll=false"));
// console.log(getHost("http://sta-lc-ftcl01-mpp-lb.nix.cydmodule.com/dealerclient/stbjdealerclient.html?tableId=6004&poll=false"));
// get();

// Prints everything
// log.info(findAll());
// log.info(count());

// Issue is gives only one object, where its expected to have many.
log.info(find());
// log.info(db.city_list);
//

let entierDB = findAll();
log.info(`Size ${entierDB.length}`);
for (let i = 0; i < entierDB.length / 1000; i++) {
    console.log(`${entierDB[i].id}, ${entierDB[i].name}, ${entierDB[i].country}, ${entierDB[i].coord.lon}, ${entierDB[i].coord.lat}`);
}
