const fs = require("fs");
const pathIsExist = function (path) {
  return fs.existsSync(path);
};

module.exports = {
  pathIsExist,
};
