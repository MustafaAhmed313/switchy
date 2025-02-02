const { Log } = require('../models/log');
const { FileOperator } = require('../utils/fileOperator');
const { JsonOperator } = require('../utils/jsonOperator');
const { logger, STATUS } = require('../utils/logger');
const {
  TYPES,
  getSuccessMessage
} = require('../utils/messageHandler');

const list = () => {

  const data = FileOperator.readFromFile(`${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`);

  if (!data) {
    return logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.EMPTY)));  
  }

  const parsedData = JsonOperator.parsingJsonData(data);

  return logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.ALL), parsedData['repositories']));

}

module.exports =  {
  list
};