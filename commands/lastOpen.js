const { JsonOperator } = require("../utils/jsonOperator");
const { FileOperator } = require("../utils/fileOperator");
const { getDataPath } = require("../utils/pathModule");

const lastOpenRepo = () => {
  let data = FileOperator.readFromFile(getDataPath());
  data = JsonOperator.parsingJsonData(data);

  return data["lastOpen"];
};

module.exports = {
  lastOpenRepo,
};
