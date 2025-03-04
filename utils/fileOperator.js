const fs = require("fs");
const config = require("../config/config");
const { Log } = require("../models/log");
const { logger, STATUS } = require("./logger");
const { getErrorMessage, TYPES } = require("./messageHandler");
const { getPath } = require("./pathModule");

class FileOperator {
  static readFromFile = function (file) {
    try {
      const data = fs.readFileSync(file, "utf-8");
      return data;
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_READ)));
      process.exit(0);
    }
  };

  static writeToFile = function (file, data) {
    try {
      const dirPath = getPath(`../${config.DIRECTORY_DATA}`);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      fs.writeFileSync(file, data, "utf-8");
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_WRITE)));
      process.exit(0);
    }
  };
}
module.exports = {
  FileOperator,
};
