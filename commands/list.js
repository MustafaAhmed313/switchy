const { Log } = require("../models/log");
const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const { logger, STATUS } = require("../utils/logger");
const {
  TYPES,
  getSuccessMessage,
  getErrorMessage,
} = require("../utils/messageHandler");
const config = require("../config/config");
const list = () => {
  const data = FileOperator.readFromFile(
    `${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`
  );

  if (!data) {
    return logger(
      new Log(STATUS.FAILED, getErrorMessage(TYPES.EMPTY, "repositories"))
    );
  }

  const parsedData = JsonOperator.parsingJsonData(data);

  return logger(
    new Log(
      STATUS.SUCCESS,
      getSuccessMessage(TYPES.ALL),
      parsedData["repositories"]
    )
  );
};

module.exports = {
  list,
};
