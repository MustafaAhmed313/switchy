const { Log } = require("../models/log");

const {
  FileOperator,
  JsonOperator,
  logger,
  STATUS,
  TYPES,
  getErrorMessage,
  getSuccessMessage,
  getDataPath
} = require('../utils/index')

const list = () => {
  const data = FileOperator.readFromFile(
    getDataPath()
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
