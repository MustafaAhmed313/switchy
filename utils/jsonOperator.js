// 1) Node Modules
// 2) User Defined Modules
const { logger, STATUS } = require("./logger");
const { Log } = require("../models/log");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES,
} = require("./messageHandler");
// 3) Third Party Modules(npm)

class JsonOperator {
  // Parsing json data
  static parsingJsonData = function (data) {
    try {
      // throw new Error("ferjeiur: new message")
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.PARSE)));
    }
  };

  // Stringify data to write in json file
  static stringDataToWriteinJson = function (data) {
    try {
      // throw new Error("fkdjfklasjdfkd")
      const stringData = JSON.stringify(data);
      return stringData;
    } catch (err) {
      logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.STRINGIFY)));
    }
  };
}

module.exports = {
  JsonOperator,
};
