const os = require("os");

const { Repository } = require("../models/repository");
const {
  FileOperator,
  JsonOperator,
  logger,
  STATUS,
  TYPES,
  getErrorMessage,
  getSuccessMessage,
  getDataPath
} = require('../utils/index'); 
const { Log } = require("../models/log");

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

  const filePath = getDataPath();
  const data = FileOperator.readFromFile(filePath);

  if (!data) {
    return logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.INIT)));
  }

  const parsedData = JsonOperator.parsingJsonData(data);

  const result = parsedData["repositories"].find((repo) => repo.name === repository.name);
  if (result) {
    return logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.DUPLICATE, `${repository.name}`)))
  }

  parsedData["repositories"].push(repository);

  FileOperator.writeToFile(
    getDataPath(),
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
