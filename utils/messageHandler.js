const TYPES = {
  NOT_FOUND: 'not-found',
  INVALID: 'invalid',
  FILE_READ: 'file-read',
  FILE_WRITE: 'file-write',
  PARSE: 'parse-json',
  STRINGIFY: 'stringify-data'
}
let message;
const getErrorMessage = (type, field) => {
  switch(type) {
    case TYPES.FILE_READ:
      message = `Failed to read the data from the file!`;
      break
    case TYPES.FILE_WRITE:
      message = `Failed to write the data into the file!`;
      break
    case TYPES.PARSE:
      message = `Faild to parse json data!`
      break
    case TYPES.STRINGIFY: 
     message = `Faild to stringify data!`
     break
    // default: 
    //   message = 'no-errors'
  }

  return message;
}


const getSuccessMessage  = (type, field) =>{
  switch(type){
    case TYPES.FILE_READ:
      message = `Success to read the data from the file!`
      break
    case TYPES.FILE_WRITE:
      message = `Success to write the data into the file!`
      break
    case TYPES.PARSE:
      message = `Success to parse json data!`
      break
    case TYPES.STRINGIFY:
        message = `Success to stringify data!`
        break
    // default: 
    //   message = 'success'
  }

  return message;
}


module.exports =  {
  TYPES,
  getSuccessMessage,
  getErrorMessage
}