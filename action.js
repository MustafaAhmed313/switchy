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
const missingField = (field) => {
  return logger(
    new Log(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, `${field}`))
  );
};
class Action {
  // Init Command => ARGS: {}
  static init = () => {
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
    logger(new Log(STATUS.FAILED, getSuccessMessage(TYPES.LAST), repoName));
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
  //   Redirect Command => ARGS: {name}
  static redirectAction = (args) => {
    missingField("The repository name");
    const name = args[0];
    const message = redirect(name);
    // The repo is not found
    return logger(
      new Log(
        message === "NotExist" ? STATUS.FAILED : STATUS.SUCCESS,
        message === "NotExist"
          ? getErrorMessage(TYPES.NOT_FOUND, "repository Name is")
          : getSuccessMessage(TYPES.REDIRECT, name)
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
  // Search Command => ARGS: {name}
  static searchAction = () => {
    missingField("The repository name");
    const repo = search();
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
  //   Update Command => ARGS: {name, newPath}
  static updateAction = (args) => {
    // No Params
    // missingField(args, "The name and newPath");
    // Path not found
    const [name, newPath] = [...args];
    if (!name) missingField("The Repo name");
    if (!newPath) missingField("The New Path");
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
      const message = update(newPath);
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
            getSuccessMessage(TYPES.UPDATE, `{${repository.name}} repository`),
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
