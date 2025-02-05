const { exec } = require("child_process");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES,
} = require("../utils/messageHandler");
const { logger, STATUS } = require("../utils/logger");
const { Log } = require("../models/log");
const { getPath } = require("../utils/pathModule");
class RunScript {
  static openInVSCode = (path) => {
    exec(`code "${path}"`, (error) => {
      if (error) {
        logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.VSCODE)));
      } else {
        logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.VSCODE)));
      }
    });
  };

  static initializeData = () => {
    const path = getPath("../scripts/init.sh");
    console.log("Path: ", path);

    exec(`bash ${path}`, (error, stdout, stderr) => {
      if (error) {
        logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.INIT)));
        return;
      }

      if (stderr) {
        logger(new Log(STATUS.FAILED, stderr));
        return;
      }

      logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.INIT)));
    });
  };
}

module.exports = { RunScript };
