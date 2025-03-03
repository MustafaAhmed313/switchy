const {
  FileOperator,
  JsonOperator,
  getDataPath,
  TAGS,
} = require("../utils/index");

const list = () => {
  const data = FileOperator.readFromFile(getDataPath());
  if (!data) {
    return TAGS.EMPTY;
  }
  const parsedData = JsonOperator.parsingJsonData(data);

  return parsedData["repositories"];
};

module.exports = {
  list,
};
