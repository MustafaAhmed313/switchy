const { TAGS } = require("./tags");
const { FileOperator } = require("../utils/fileOperator");

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
    return TAGS.EMPTY;
  }

  // Otherwise, return "NotEmpty"
  return TAGS.FULL;
};

module.exports = {
  pathIsExist,
  fileIsEmpty,
};
