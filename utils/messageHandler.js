const TYPES = {
  NOT_FOUND: 'not-found',
  INVALID: 'invalid',
  FILE_READ: 'file-read',
  FILE_WRITE: 'file-write',
  PARSE: 'parse-json',
  STRINGIFY: 'stringify-data',
  ADD: 'repository',
  UPDATE: 'repository',
  REQUIRED: 'required'
  REMOVE: "remove-repository",
}

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
    case TYPES.REMOVE:
      message = `This repository was not found`;
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
  }

  return message;
};

module.exports = {
  TYPES,
  getSuccessMessage,
  getErrorMessage,
};

// The repository has been removed successfullyfeat: Implement `removeRepo` functionality

// - Added `removeRepo.js` to implement the repository removal functionality.
// - Made minor changes in `JsonOperator.js` to support the new feature.
// - Enabled users to remove any repository they wish to delete.
