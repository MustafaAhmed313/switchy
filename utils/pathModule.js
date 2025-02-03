const path = require("path");
const config = require("../config/config");
exports.getDataPath = function () {
  return path.join(
    __dirname,
    `../${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`
  );
};

exports.getPath = function (pathFile) {
  return path.join(__dirname, pathFile);
};
