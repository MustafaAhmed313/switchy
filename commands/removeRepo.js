// 1) Node Modules
// 2) User Defined Modules
const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const { RepoOperator } = require("../utils/repoOperatror");
const { Log } = require("../models/log");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES,
} = require("../utils/messageHandler");
// const {} = require("../utils/logger");
// 3) Third Party Modules(npm)
const dotenv = require("dotenv");
const { logger, STATUS } = require("../utils/logger");
dotenv.config({ path: ".env" });

const remove = (repoName) => {
  let message = "";
  //  first thing ==> read data from file data
  const filePath = `${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`;

  let data = FileOperator.readFromFile(filePath);
  // second step parse it
  data = JsonOperator.parsingJsonData(data);
  // third step delete repo
  let index = RepoOperator.getRepoIndexByName(data["repositories"], repoName);
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
        ? getErrorMessage(TYPES.REMOVE_REPO)
        : getSuccessMessage(TYPES.REMOVE_REPO)
    )
  );
};

module.exports = {
  remove,
};
