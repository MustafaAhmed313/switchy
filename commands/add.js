const os = require("os");

const { Repository } = require("../models/repository");
const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const { Log } = require("../models/log");
const { logger, STATUS } = require("../utils/logger");

const config = require("../config/config");
const {
  getSuccessMessage,
  TYPES,
  getErrorMessage,
} = require("../utils/messageHandler");

const currentOS = os.type();

const add = (path) => {
  if (!path) {
    return logger(
      new Log(
        STATUS.FAILED,
        getErrorMessage(TYPES.REQUIRED, "Repository path is")
      )
    );
  }

  const condition = currentOS === `Linux` || currentOS === `Darwin`;
  const index = path.lastIndexOf(condition ? "/" : `\\`) + 1;
  const name = path.substring(index);

  const repository = new Repository(
    name,
    path,
    new Date(Date.now()).toUTCString()
  );

  const data = FileOperator.readFromFile(
    `${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`
  );

  if (!data) {
    return logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.INIT)));
  }

  const parsedData = JsonOperator.parsingJsonData(data);
  parsedData["repositories"].push(repository);

  FileOperator.writeToFile(
    `${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`,
    JSON.stringify(parsedData)
  );

  logger(
    new Log(
      STATUS.SUCCESS,
      getSuccessMessage(TYPES.ADD, "repository"),
      repository
    )
  );
};

module.exports = {
  add,
};
