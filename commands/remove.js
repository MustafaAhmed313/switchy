// 1) Node Modules

// 2) User Defined Modules
const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const { RepoOperator } = require("../utils/repoOperator");
const { Log } = require("../models/log");
const config = require("../config/config");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES,
} = require("../utils/messageHandler");

// 3) Third Party Modules(npm)
const { logger, STATUS } = require("../utils/logger");

const remove = (name) => {
  let message = "";
  //  first thing ==> read data from file data
  const filePath = `${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`;

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

  return logger(
    new Log(
      index === -1 ? STATUS.FAILED : STATUS.SUCCESS,
      index === -1
        ? getErrorMessage(TYPES.NOT_FOUND)
        : getSuccessMessage(TYPES.REMOVE, "Repository")
    )
  );
};

module.exports = {
  remove,
};
