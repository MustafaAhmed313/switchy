const {
  FileOperator,
  JsonOperator,
  getDataPath
} = require('../utils/index')

const last = () => {
  let data = FileOperator.readFromFile(getDataPath());
  data = JsonOperator.parsingJsonData(data);

  return data["lastOpen"];
};

module.exports = {
  last,
};
