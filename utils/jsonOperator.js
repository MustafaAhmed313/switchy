const { Log } = require("../models/log")
const { 
  logger, 
  STATUS 
} = require("./logger");
const {
  getErrorMessage, 
  TYPES
} = require("./messageHandler")

class JsonOperator {
  
  static parsingJsonData = function (data) {
    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.PARSE)));
      process.exit(0);
    }
  };

  static stringDataToWriteinJson = function (data) {
    try {
      const stringData = JSON.stringify(data);
      return stringData;
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.STRINGIFY)));
      process.exit(0);
    }
  };
  
}

module.exports = {
  JsonOperator,
};
