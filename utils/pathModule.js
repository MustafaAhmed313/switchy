const path = require("path");
const config = require("../config/config");
const os = require("os");
exports.getDataPath = function () {
  return path.join(
    __dirname,
    `../${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`
  );
};

exports.getPath = function (pathFile) {
  return path.join(__dirname, pathFile);
};

exports.getName = function (path) {
  const currentOS = os.type();
  const condition = currentOS === `Linux` || currentOS === `Darwin`;
  const index = path.lastIndexOf(condition ? "/" : `\\`) + 1;
  const name = path.substring(index);
  return name;
};
