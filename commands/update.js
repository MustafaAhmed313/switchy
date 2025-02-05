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

const update = (name, path) => {
  // if (!name || !path) {
  //   return logger(
  //     new Log(
  //       STATUS.FAILED,
  //       getErrorMessage(TYPES.REQUIRED, "Repository name and path are")
  //     )
  //   );
  // }

  const data = FileOperator.readFromFile(getDataPath());
  const parsedData = JsonOperator.parsingJsonData(data);

  const [repository] = parsedData["repositories"].filter(
    (repo) => repo.name === name
  );

  if (!repository) {
    return "NotExist";
    return logger(
      new Log(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "Repository"))
    );
  }

  const index = parsedData["repositories"].indexOf(repository);

  if (path === repository.path) {
    return "Similar";
    return logger(
      new Log(STATUS.FAILED, getErrorMessage(TYPES.UPDATE, "path"))
    );
  }

  repository.path = path;

  parsedData["repositories"][index] = repository;
  const stringData = JsonOperator.stringDataToWriteinJson(parsedData);
  FileOperator.writeToFile(getDataPath(), stringData);

  return "Updated";
  return logger(
    new Log(
      STATUS.SUCCESS,
      getSuccessMessage(TYPES.UPDATE, `{${repository.name}} repository`),
      repository
    )
  );
};

module.exports = {
  update,
};
