const { Log } = require('../models/log');
const { FileOperator } = require('../utils/fileOperator');
const { JsonOperator } = require('../utils/jsonOperator');
const { logger, STATUS } = require('../utils/logger');
const {
  getErrorMessage,
  TYPES,
  getSuccessMessage
} = require('../utils/messageHandler');

// TODO: CHECKING FOR EXISTING PATHS AND REPOS.

const update = (name, path) => {

  if (!name || !path) {
    return logger(new Log(
      STATUS.FAILED,
      getErrorMessage(TYPES.REQUIRED, 'Repository name and path are')
    ));
  }

  const data = FileOperator.readFromFile(
    `${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`
  );
  const parsedData = JsonOperator.parsingJsonData(data);

  const [repository] = parsedData['repositories'].filter((repo) => (repo.name === name));
  
  if (!repository) {
    return logger(new Log(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, 'Repository')
    ));
  }

  const index = parsedData['repositories'].indexOf(repository);

  if (path === repository.path) {
    return logger(new Log(
      STATUS.FAILED,
      getErrorMessage(TYPES.UPDATE, 'path')
    ));
  }

  repository.path = path;

  parsedData['repositories'][index] = repository;
  const stringData = JsonOperator.stringDataToWriteinJson(parsedData);
  FileOperator.writeToFile(
    `${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`,
    stringData
  );

  return logger(new Log(
    STATUS.SUCCESS,
    getSuccessMessage(TYPES.UPDATE, `{${repository.name}} repository`),
    repository
  ));

};

module.exports = {
  update
};