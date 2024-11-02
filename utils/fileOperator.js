const fs = require("fs");
const { Log } = require("../models/log");
const { logger, STATUS } = require("./logger");
const {
  getSuccessMessage,
  getErrorMessage,
  TYPES,
} = require("./messageHandler");
class FileOperator {
  // Read from json file
  static readFromFile = function (file) {
    try {
      const data = fs.readFileSync(file, "utf-8");
      return data;
    } catch (err) {
      // throw error with your way
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_READ)));
    }
  };
  // Write to json file
  static writeToFile = function (file, data) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(file, data, "utf-8", (err) => {
        if (err)
          reject(
            logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_WRITE)))
          );
        else
          resolve(
            logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.FILE_WRITE)))
          );
      });
    });
  };
}

module.exports = {
  FileOperator,
};
