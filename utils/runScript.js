const { exec } = require("child_process");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES,
} = require("../utils/messageHandler");
const { logger, STATUS } = require("../utils/logger");
const { Log } = require("../models/log");
const { getPath } = require("../utils/pathModule");

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

  static initializeData = () => {
    const path = getPath("../scripts/init.sh");

    exec(`bash ${path}`, (error, stdout, stderr) => {
      if (error) {
        logger(new Log(STATUS.FAILED, error));
        return;
      } else if (stderr) {
        logger(new Log(STATUS.FAILED, stderr));
        return;
      }
      logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.INIT)));
    });
  };

  static dotGitIsExist = async (repoPath) => {
    const path = getPath("../scripts/dotGitExist.sh");

    return new Promise((resolve, reject) => {
      exec(`bash ${path} ${repoPath}`, (error, stdout, stderr) => {
        console.log("repoPath : ", repoPath);
        if (error) {
          logger(new Log(STATUS.FAILED, error));
          return resolve(0);
        }
        if (stderr) {
          logger(new Log(STATUS.FAILED, stderr));
          return resolve(0);
        }
        resolve(stdout.trim());
      });
    });
  };
}
// const response =
// (async () => {
//   return await RunScript.dotGitIsExist("../../switchy");
// })();

module.exports = { RunScript };
