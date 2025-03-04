const { exec } = require("child_process");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES,
} = require("../utils/messageHandler");
const { logger, STATUS } = require("../utils/logger");
const { Log } = require("../models/log");

// error  ==> to handle critical failures where the command itself cannot execute.
// stderr ==> to handle errors that occur during the execution of the script.
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
}

module.exports = { RunScript };
