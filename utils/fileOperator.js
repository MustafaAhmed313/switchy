const fs = require("fs");

const { Log } = require("../models/log");

const { 
  logger, 
  STATUS 
} = require("./logger");

const {
  getErrorMessage,
  TYPES,
} = require("./messageHandler");

class FileOperator {
  static readFromFile = function (file) {
    try {
      const data = fs.readFileSync(file, "utf-8");
      return data;
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_READ)));
    }
  };

  static writeToFile = function (file, data) {
    try {
      fs.writeFileSync(file, data, "utf-8");
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_WRITE)));
    }
  };
}
module.exports = {
  FileOperator,
};
