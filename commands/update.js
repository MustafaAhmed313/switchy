const {
  FileOperator,
  JsonOperator,
  TAGS,
  getDataPath
} = require("../utils/index");
const { getName } = require("../utils/pathModule");

const update = (name, path) => {

  const repoName = getName(path);

  if (repoName !== name) {
    return TAGS.NO_MATCH;
  }

  const data = FileOperator.readFromFile(getDataPath());
  const parsedData = JsonOperator.parsingJsonData(data);

  const [repository] = parsedData["repositories"].filter(
    (repo) => repo.name === name
  );

  if (!repository) {
    return TAGS.DOES_NOT_EXIST;
  }

  const index = parsedData["repositories"].indexOf(repository);

  if (path === repository.path) {
    return TAGS.DUPLICATED;
  }

  repository.path = path;

  parsedData["repositories"][index] = repository;
  const stringData = JsonOperator.stringDataToWriteinJson(parsedData);
  FileOperator.writeToFile(getDataPath(), stringData);

  return TAGS.UPDATED;
};

module.exports = {
  update,
};
