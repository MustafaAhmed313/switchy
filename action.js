const {
  add,
  update,
  remove,
  list,
  init,
  redirect,
  search,
  last,
  reset,
} = require("./commands/index");
const {
  logger,
  STATUS,
  TYPES,
  getDataPath,
  getPath,
  getErrorMessage,
  getSuccessMessage,
  fileIsEmpty,
  pathIsExist,
  getName,
  RunScript,
} = require("./utils/index");
const { Log } = require("./models/log");
class Action {
  static handleEnvAction = () => {
    // first thing if data file is not exist make data file
    RunScript.initializeData();
    // check if data file is empty, if yes then tell use run(init command) initialize it
    const path = getDataPath();
    if (fileIsEmpty(path) === "Empty") {
      logger(
        new Log(
          STATUS.HINT,
          getErrorMessage(TYPES.EMPTY, "data(file not initalize)")
        )
      );
      process.exit();
    }
  };
  // Init Command => ARGS: {}
  static initAction = () => {
    // console.log("hello from init command");
    init();
  };

  // Add Command => ARGS: {path}   ==> we have a problem with path (if user write all path you don't need getPath and if write simple path you need getPath)
  static addAction = (repoPath) => {
    // No Params
    if (!repoPath)
      return logger(
        new Log(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, `The path`))
      );
    // Path not found
    if (!pathIsExist(repoPath)) {
      return logger(
        new Log(
          STATUS.FAILED,
          getErrorMessage(TYPES.NOT_FOUND, "Repository path is")
        )
      );
    }

    // Path is not a repo (dotGitIsExist(repoPath) is async function)
    (async () => {
      const response = await RunScript.dotGitIsExist(repoPath);
      if (response === "false") {
        return logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.REPO)));
      }
      const message = add(repoPath);
      const repoName = getName(repoPath);
      if (message === "Duplicated") {
        return logger(
          new Log(
            STATUS.FAILED,
            getErrorMessage(TYPES.DUPLICATE, `${repoName}}`)
          )
        );
      } else {
        return logger(
          new Log(
            STATUS.SUCCESS,
            getSuccessMessage(TYPES.ADD, `The Repository ${repoName}`)
          )
        );
      }
    })();
  };

  // Last Command (Get last opened repo) => ARGS: {}
  static lastAction = () => {
    const repoName = last();
    logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.LAST), repoName));
  };
  // List Command => ARGS: {}
  static listAction = () => {
    const repos = list();

    if (repos === "Empty") {
      return logger(
        new Log(STATUS.SUCCESS, getErrorMessage(TYPES.EMPTY, "repositories"))
      );
    } else
      return logger(
        new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.ALL), repos)
      );
  };
  //   Redirect Command => ARGS: {repoName}
  static redirectAction = (repoName) => {
    const message = redirect(repoName);
    // The repo is not found
    return logger(
      new Log(
        message === "NotExist" ? STATUS.FAILED : STATUS.SUCCESS,
        message === "NotExist"
          ? getErrorMessage(TYPES.NOT_FOUND, "repository Name is")
          : getSuccessMessage(TYPES.REDIRECT, repoName)
      )
    );
  };
  // Search Command => ARGS: {repoName}
  static searchAction = (repoName) => {
    const repo = search(repoName);
    return logger(
      new Log(
        repo === "NotExist" ? STATUS.FAILED : STATUS.SUCCESS,
        repo === "NotExist"
          ? getErrorMessage(TYPES.NOT_FOUND, "repository Name is")
          : getSuccessMessage(TYPES.REPO),
        repo
      )
    );
  };
  // Remove Command => ARGS: {name}
  static removeAction = (repoName) => {
    // Commander handle error for missing fields
    const index = remove(repoName);
    // The repo is not found
    return logger(
      new Log(
        index === -1 ? STATUS.FAILED : STATUS.SUCCESS,
        index === -1
          ? getErrorMessage(TYPES.NOT_FOUND)
          : getSuccessMessage(TYPES.REMOVE, "Repository")
      )
    );
  };
  //   Update Command => ARGS: {name, newPath}
  static updateAction = (repoName, newPath) => {
    // if (!name) missingField("The Repo name");
    // // Path not found
    // if (!newPath) missingField("The New Path");
    if (!pathIsExist(newPath)) {
      logger(
        STATUS.FAILED,
        getErrorMessage(TYPES.NOT_FOUND, "Repository path is")
      );
    }

    // Path is not a repo (dotGitIsExist(repoPath) is async function)
    (async () => {
      const response = await RunScript.dotGitIsExist(newPath);
      if (response === "false") {
        logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.REPO)));
      }
      const message = update(repoName, newPath);
      if (message === "NotExist") {
        return logger(
          new Log(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "Repository"))
        );
      } else if (message === "Similar") {
        return logger(
          new Log(STATUS.FAILED, getErrorMessage(TYPES.UPDATE, "path"))
        );
      } else {
        return logger(
          new Log(
            STATUS.SUCCESS,
            getSuccessMessage(TYPES.UPDATE, `{${repoName}} repository`),
            repository
          )
        );
      }
    })();
  };
}
// add
// init
// last
// list
// redirect
// remove
// search
// update

// remind =>
// reset

module.exports = { Action };
