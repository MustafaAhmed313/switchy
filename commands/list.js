const { Log } = require("../models/log");

const {
  FileOperator,
  JsonOperator,
  logger,
  STATUS,
  TYPES,
  getErrorMessage,
  getSuccessMessage,
  getDataPath,
} = require("../utils/index");

const list = () => {
  const data = FileOperator.readFromFile(getDataPath());
  if (!data) {
    return "Empty";
  }
  const parsedData = JsonOperator.parsingJsonData(data);

  return parsedData["repositories"];
};

module.exports = {
  list,
};
