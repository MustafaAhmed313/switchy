const { init } = require('./init');
const { Log } = require('../models/log');
const {
  FileOperator,
  JsonOperator,
  getDataPath,
  logger,
  STATUS,
  getSuccessMessage,
  TYPES
} = require('../utils/index');


const reset = () => {
  const path = getDataPath();
  
  const data = FileOperator.readFromFile(path);
  if (!data) {
    init();
    return logger(new Log(STATUS.SUCCESS, 
      getSuccessMessage(TYPES.RESET)
    ));
  }

  let parsedData = JsonOperator.parsingJsonData(data);
  parsedData = {
    lastOpen: 'none',
    repositories: []
  };

  const stringData = JsonOperator.stringDataToWriteinJson(parsedData);

  FileOperator.writeToFile(path, stringData);

  return logger(new Log(STATUS.SUCCESS, 
    getSuccessMessage(TYPES.RESET)
  ));

};

module.exports = {
  reset
}