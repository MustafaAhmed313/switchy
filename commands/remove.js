// 1) Node Modules

// 2) User Defined Modules
const { Log } = require("../models/log");

const {
  FileOperator,
  JsonOperator,
  logger,
  STATUS,
  TYPES,
  getErrorMessage,
  getSuccessMessage,
} = require("../utils/index");

const remove = (name) => {
  //  first thing ==> read data from file data
  const filePath = getDataPath();

  let data = FileOperator.readFromFile(filePath);
  // second step parse it
  data = JsonOperator.parsingJsonData(data);
  // third step delete repo
  let index = RepoOperator.getRepoIndexByName(data["repositories"], name);
  if (data["lastOpened"] === data["repositories"].name)
    data["lastOpen"] = "none";
  if (index !== -1) RepoOperator.removeRepoByIndex(data["repositories"], index);

  // four strigify it
  if (index !== -1) {
    data = JsonOperator.stringDataToWriteinJson(data);
    FileOperator.writeToFile(filePath, data);
  }

  return index;
};

module.exports = {
  remove,
};
