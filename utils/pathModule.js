const path = require("path");
const os = require("os");

const config = require("../config/config");

exports.getDataPath = function () {
  return path.join(
    __dirname,
    `../${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`
  );
};

exports.getDirPath = function () {
  return path.join(
    __dirname,
    `../${config.DIRECTORY_DATA}`
  );
};

exports.getPath = function (filePath) {
  return path.join(__dirname, filePath);
};

exports.getName = function (path) {
  const currentOS = os.type();
  const condition = currentOS === `Linux` || currentOS === `Darwin`;
  const index = path.lastIndexOf(condition ? "/" : `\\`) + 1;
  const name = path.substring(index);
  return name;
};
