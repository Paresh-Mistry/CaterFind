/**
 * Data Access Layer
 * Abstracts file I/O so it can be swapped with a DB (MongoDB/PostgreSQL) later.
 */

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../data/caterers.json");

const readData = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read data file:", err.message);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write data file:", err.message);
    return false;
  }
};

module.exports = { readData, writeData };