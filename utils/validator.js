const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const fs = require("fs");
const pathIsExist = function (path) {
  return fs.existsSync(path);
};

const fileIsEmpty = function (path) {
  let data = FileOperator.readFromFile(path);

  // If data is null or an empty string, return "Empty"
  if (
    data === null ||
    data === "" ||
    (typeof data === "object" && Object.keys(data).length === 0)
  ) {
    return "Empty";
  }

  // Otherwise, return "NotEmpty"
  return "NotEmpty";
};

module.exports = {
  pathIsExist,
  fileIsEmpty,
};
