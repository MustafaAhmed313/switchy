const path = require("path");
const os = require("os");

const config = require("../config/config");

const getDataPath = function () {
  return path.join(
    __dirname,
    `../${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`
  );
};

const getPath = function (filePath) {
  return path.join(__dirname, filePath);
};

const getName = function (path) {
  const currentOS = os.type();
  const condition = currentOS === `Linux` || currentOS === `Darwin`;
  const index = path.lastIndexOf(condition ? "/" : `\\`) + 1;
  const name = path.substring(index);
  return name;
};

module.exports = {
  getDataPath,
  getPath,
  getName,
};
