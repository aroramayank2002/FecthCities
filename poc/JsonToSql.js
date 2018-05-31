/*
node .\poc\JsonToSql.js
*/
const jsonDb = require("diskdb");
const bunyan = require("bunyan");
const bformat = require("bunyan-format");
const formatOut = bformat({ outputMode: "short" });
var sqlite3 = require("sqlite3").verbose();

// info, debug, trace
let log = bunyan.createLogger({
    name: "JsonToSql",
    stream: formatOut,
    level: "debug"
});

let startTime = new Date().getTime()

jsonDb.connect("./data-static", ["city_list"]);
var sqlDb = new sqlite3.Database("./poc/json/city.db");

function findAll() {
    return jsonDb.city_list.find();
}

let entierDB = findAll();
log.info(`Size ${entierDB.length}`);
// for (let i = 0; i < entierDB.length / 1000; i++) {
//     log.info(`${i}, ${entierDB[i].id}, ${entierDB[i].name}, ${entierDB[i].country}, ${entierDB[i].coord.lon}, ${entierDB[i].coord.lat}`);
// }

function populateDB() {
    sqlDb.serialize(function () {
        const createTable = `CREATE TABLE CITIES(
                          ID INT PRIMARY KEY     NOT NULL,
                          CITY           TEXT    NOT NULL,
                          COUNTRY        TEXT    NOT NULL,
                          LAT            REAL,
                          LON            REAL,
                          WHETHER_YESTERDAY        CHAR(50),
                          WHETHER_TODAY            CHAR(50),
                          WHETHER_TOMORROW         CHAR(50));`;

        sqlDb.run(createTable);

        var stmt = sqlDb.prepare("INSERT INTO CITIES VALUES (?,?,?,?,?,?,?,?)");

        // rainy, cloudy, sunny
        // entierDB.length
        for (let i = 0; i < entierDB.length; i++) {
            stmt.run(entierDB[i].id, entierDB[i].name, entierDB[i].country, entierDB[i].coord.lon, entierDB[i].coord.lat, "rainy", "cloudy", "sunny");
            // log.info(`${i}, ${entierDB[i].id}, ${entierDB[i].name}, ${entierDB[i].country}, ${entierDB[i].coord.lon}, ${entierDB[i].coord.lat}`);
        }
        stmt.finalize();
    });
    sqlDb.close();
    log.info(`Time to test (sec): ${(new Date().getTime() - startTime) / 1000}`);
}

function fetchData() {
    sqlDb.serialize(function () {
        sqlDb.each("SELECT ID, CITY, COUNTRY, LAT, LON, WHETHER_YESTERDAY,WHETHER_TODAY,WHETHER_TOMORROW FROM CITIES", function (err, row) {
            log.info(`Data: ${row.ID}, ${row.NAME}, ${row.COUNTRY}, ${row.LAT}, ${row.LON}, ${row.WHETHER_YESTERDAY}, ${row.WHETHER_TODAY}, ${row.WHETHER_TOMORROW}`);
            // console.log(row.id + ": " + row.info);
            // stmt.run(entierDB[i].id, entierDB[i].name, entierDB[i].country, entierDB[i].coord.lon, entierDB[i].coord.lat);
        });
    });
    sqlDb.close();
}

function getWhetherByCountryAndCity(country, city) {
    sqlDb.serialize(function () {
        sqlDb.each(`SELECT ID, CITY, COUNTRY, LAT, LON, WHETHER_YESTERDAY,WHETHER_TODAY,WHETHER_TOMORROW FROM CITIES where COUNTRY='${country}' and CITY='${city}'`, function (err, row) {
            log.info(`Data for ${country} & ${city}: ${row.ID}, ${row.NAME}, ${row.COUNTRY}, ${row.LAT}, ${row.LON}, ${row.WHETHER_YESTERDAY}, ${row.WHETHER_TODAY}, ${row.WHETHER_TOMORROW}`);
            // console.log(row.id + ": " + row.info);
            // stmt.run(entierDB[i].id, entierDB[i].name, entierDB[i].country, entierDB[i].coord.lon, entierDB[i].coord.lat);
        });
    });
    sqlDb.close();
}

// populateDB();
fetchData();

//Fetch cities with good whether ( limit clause ):
// https://www.tutorialspoint.com/sqlite/sqlite_limit_clause.htm
//Fetch whether details with country and city name
