const TYPES = {
  NOT_FOUND: "not-found",
  INVALID: "invalid",
  FILE_READ: "file-read",
  FILE_WRITE: "file-write",
  PARSE: "parse-json",
  STRINGIFY: "stringify-data",
  ADD: "add",
  UPDATE: "update",
  REQUIRED: "required",
  REMOVE: "remove",
  ALL: "all",
  EMPTY: "empty",
  VSCODE: "vscode",
  INIT: "init",
};

let message;

const getErrorMessage = (type, field) => {
  switch (type) {
    case TYPES.FILE_READ:
      message = `Failed to read the data from the file!`;
      break;
    case TYPES.FILE_WRITE:
      message = `Failed to write the data into the file!`;
      break;
    case TYPES.PARSE:
      message = `Faild to parse json data!`;
      break;
    case TYPES.STRINGIFY:
      message = `Faild to stringify data!`;
      break;
    case TYPES.REQUIRED:
      message = `${field} required!`;
      break;
    case TYPES.UPDATE:
      message = `The new ${field} and old ${field} are similar!`;
      break;
    case TYPES.NOT_FOUND:
      message = `${field} not found!`;
      break;
    case TYPES.INIT:
      message = `Data has not been initialized yet!`;
      break;
    case TYPES.VSCODE:
      message = `Failed to open VS Code`;
      break;
    case TYPES.EMPTY:
      message = `No ${field} stored yet!`;
      break;
  }

  return message;
};

const getSuccessMessage = (type, field) => {
  switch (type) {
    case TYPES.FILE_READ:
      message = `Success to read the data from the file!`;
      break;
    case TYPES.FILE_WRITE:
      message = `Success to write the data into the file!`;
      break;
    case TYPES.PARSE:
      message = `Success to parse json data!`;
      break;
    case TYPES.STRINGIFY:
      message = `Success to stringify data!`;
      break;
    case TYPES.REMOVE:
      message = `The repository has been removed successfully`;
      break;
    case TYPES.ADD:
      message = `New ${field} added to Switchy Successfully!`;
      break;
    case TYPES.UPDATE:
      message = `${field} is updated Successfully!`;
      break;
    case TYPES.ALL:
      message = `Switchy stored repositories:`;
      break;
    case TYPES.VSCODE:
      message = `Path Opened in VS Code Successfully!`;
      break;
    case TYPES.INIT:
      message = `The data has been initialized successfully!`;
      break;
  }

  return message;
};

module.exports = {
  TYPES,
  getSuccessMessage,
  getErrorMessage,
};
