const ERRORS = {
  NOT_FOUND: 'not-found',
  INVALID: 'invalid',
  FILE_READ: 'file-read',
  FILE_WRITE: 'file-write'
}

const getErrorMessage = (type, field) => {
  let message;

  switch(type) {
    case ERRORS.FILE_READ:
      message = `Failed to read the data from the file!`;
    case ERRORS.FILE_WRITE:
      message = `Failed to write the data into the file!`;
    default: 
      message = 'no-errors'
  }

  return message;
}


module.exports =  {
  ERRORS,
  getErrorMessage
}