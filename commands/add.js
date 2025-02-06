const { Repository } = require("../models/repository");
const {
  FileOperator,
  JsonOperator,
  getDataPath,
  getName,
} = require("../utils/index");

const add = (path) => {
  const name = getName(path);
  const repository = new Repository(
    name,
    path,
    new Date(Date.now()).toUTCString()
  );

  const filePath = getDataPath();
  const data = FileOperator.readFromFile(filePath);

  // if (!data) {
  //   return logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.INIT)));
  // }

  let parsedData = JsonOperator.parsingJsonData(data);

  const result = parsedData["repositories"].find(
    (repo) => repo.name === repository.name
  );
  if (result) {
    return "Duplicated";
  }
  // if (result) {
  //   return logger(
  //     new Log(
  //       STATUS.FAILED,
  //       getErrorMessage(TYPES.DUPLICATE, `${repository.name}`)
  //     )
  //   );
  // }

  parsedData["repositories"].push(repository);
  parsedData = JsonOperator.stringDataToWriteinJson(parsedData);
  FileOperator.writeToFile(getDataPath(), parsedData);

  // logger(
  //   new Log(
  //     STATUS.SUCCESS,
  //     getSuccessMessage(TYPES.ADD, "repository"),
  //     repository
  //   )
  // );

  return "Added";
};

module.exports = {
  add,
};
