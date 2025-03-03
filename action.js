const os = require('os');

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
  getErrorMessage,
  getSuccessMessage,
  fileIsEmpty,
  pathIsExist,
  getName,
  RunScript,
  TAGS,
} = require("./utils/index");

const { Log } = require("./models/log");
class Action {
  static handleEnvAction = () => {
    // first thing if data file is not exist make data file
    if (os.platform() === 'linux' || os.platform() === 'darwin') {
      RunScript.initializeData();
    } else {
      RunScript.initializeDataPowerShell();
    } 
    // check if data file is empty, if yes then tell use run(init command) initialize it
    const path = getDataPath();
    if (fileIsEmpty(path) === TAGS.EMPTY) {
      logger(
        new Log(
          STATUS.FAILED,
          getErrorMessage(TYPES.EMPTY, "data(file not initalize)")
        )
      );
      process.exit();
    }
  };
  // Init Command => ARGS: {}
  static initAction = () => {
    init();
    return logger(
      new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.INIT)));
  };

  // reset Command => ARGS {}
  static resetAction = () => {
    reset();
    return logger(
      new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.RESET)));
  }

  // Add Command => ARGS: {path}   ==> we have a problem with path (if user write all path you don't need getPath and if write simple path you need getPath)
  static addAction = (path) => {
    // No Params
    if (!path) {
      logger(
        new Log(
          STATUS.FAILED, 
          getErrorMessage(TYPES.REQUIRED, `The repository path`))
      );
      return TAGS.MISSING;
    }
    // Path not found
    if (!pathIsExist(path)) {
      logger(
        new Log(
          STATUS.FAILED,
          getErrorMessage(TYPES.NOT_FOUND, "repository path is")
        ));
      return TAGS.DOES_NOT_EXIST;
    }

    (async () => {
      let response;
      
      if (os.platform() === 'linux' || os.platform() === 'darwin') {
        response = await RunScript.dotGitIsExist(path);
      } else {
        response = await RunScript.dotGitIsExistPowerShell(path);
      }

      if (response === "false") {
        logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.DOT_GIT)));
        return TAGS.NOT_GIT_REPO;
      }

      const message = add(path);      
      const name = getName(path);
      
      if (message.tag === TAGS.DUPLICATED) {
        logger(
          new Log(
            STATUS.FAILED,
            getErrorMessage(TYPES.DUPLICATE, `{${name}}`)
          ));
      } else {
        logger(
          new Log(
            STATUS.SUCCESS,
            getSuccessMessage(TYPES.ADD, `The Repository ${name}`),
            message.repository
          ));
      }
      return message.tag; 
    })();

  };

  // Last Command (Get last opened repo) => ARGS: {}
  static lastAction = () => {
    const name = last();
    logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.LAST), name));
  };
  // List Command => ARGS: {}
  static listAction = () => {
    const repositories = list();

    if (repositories === TAGS.EMPTY) {
      return logger(
        new Log(STATUS.SUCCESS, getErrorMessage(TYPES.EMPTY, "repositories"))
      );
    } else
      return logger(
        new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.ALL), repositories)
      );
  };
  //   Redirect Command => ARGS: {name}
  static redirectAction = (repoName) => {
    const message = redirect(repoName);
    logger(
      new Log(
        message === TAGS.DOES_NOT_EXIST ? STATUS.FAILED : STATUS.SUCCESS,
        message === TAGS.DOES_NOT_EXIST
          ? getErrorMessage(TYPES.NOT_FOUND, `repository {${repoName}} is`)
          : getSuccessMessage(TYPES.REDIRECT, repoName)
      )
    );
    // The repo is not found
    return message; 
  };
  // Search Command => ARGS: {name}
  static searchAction = (name) => {
    const repository = search(name);
    if (repository === TAGS.DOES_NOT_EXIST) {
      logger(new Log(
        STATUS.FAILED,
        getErrorMessage(TYPES.NOT_FOUND, `repository ${name} is`)
      ));
      return repository; 
    } else {
      logger(new Log(
        STATUS.SUCCESS,
        getSuccessMessage(TYPES.DOT_GIT),
        repository
      ));
      return TAGS.EXIST; 
    }
  };
  // Remove Command => ARGS: {name}
  static removeAction = (name) => {
    // Commander handle error for missing fields
    const message = remove(name);
    // The repo is not found
    logger(
      new Log(
        message !== TAGS.REMOVED ? STATUS.FAILED : STATUS.SUCCESS,
        message !== TAGS.REMOVED
          ? getErrorMessage(TYPES.NOT_FOUND, `repository ${name} is`)
          : getSuccessMessage(TYPES.REMOVE)
      )
    );
    return message; 
  };
  //   Update Command => ARGS: {name, path}
  static updateAction = (name, path) => {
    if (!name || !path) {
      logger(
        new Log(
          STATUS.FAILED,
          getErrorMessage(TYPES.REQUIRED, "Repository name and path are")
        )
      );
      return TAGS.MISSING;
    }

    if (!pathIsExist(path)) {
      logger(
        STATUS.FAILED,
        getErrorMessage(TYPES.NOT_FOUND, "Repository path is")
      );
      return TAGS.DOES_NOT_EXIST;
    }

    // Path is not a repo (dotGitIsExist(path) is async function)
    (async () => {
      let response;
      
      if (os.platform() === 'linux' || os.platform() === 'darwin') {
        response = await RunScript.dotGitIsExist(path);
      } else {
        response = await RunScript.dotGitIsExistPowerShell(path);
      }

      // TODO: ignore adding any file that not a github repository.

      if (response === "false") {
        logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.DOT_GIT)));
        return TAGS.NOT_GIT_REPO;
      }
      
      const message = update(name, path);
  
      if (message === TAGS.NO_MATCH) {
        logger(
          new Log(STATUS.FAILED, getErrorMessage(TYPES.MATCH)));
      } else if (message === TAGS.DOES_NOT_EXIST) {
        logger(
          new Log(STATUS.FAILED, 
            getErrorMessage(TYPES.NOT_FOUND, `repository ${name} is`)) 
        );
      } else if (message === TAGS.DUPLICATED) {
        logger(
          new Log(STATUS.FAILED, getErrorMessage(TYPES.UPDATE, "path")) 
        );
      } else {
        const repository = search(`${name}`);
        logger(
          new Log(
            STATUS.SUCCESS,
            getSuccessMessage(TYPES.UPDATE, `{${name}} repository`),
            repository
          )
        ); 
      }
      return message;
    })();

  }
}

module.exports = { Action };
