const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const { RepoOperator } = require("../utils/repoOperator");
const { getDataPath } = require("../utils/pathModule");
const search = (name) => {
  const path = getDataPath();
  let data = FileOperator.readFromFile(path);
  data = JsonOperator.parsingJsonData(data);
  const repoIndex = RepoOperator.getRepoIndexByName(data["repositories"], name);
  if (repoIndex === -1) {
    return "NotExist";
  }
  return data["repositories"][repoIndex];
};
module.exports = {
  search,
};
