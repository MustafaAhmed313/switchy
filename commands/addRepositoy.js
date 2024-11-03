/*
1- get the repo path.

2- validate the absolute path.

  a- check if the path contains .git file.

    I- run bash script that take the path and try to access path if 
    it exist. O.W return false.

    II- if the path exists, list all its nested instances and check if 
    one of them is equal to .git file. O.W return false.

    III- if the .git file exists in the given path, return true.
    
3- if the validation process returns true, create the Repository entity.

  a- extract the repository name from its valid absolute path.
  
  b- assign the absolute path if its valid to the path field in the repository model.

  c- create UTC date indicate first registeration date in switchy.

4- get the data from data.json file and parse it to json Object.

5- push the new repository entity inside the array stored in the field repositories in the 
parsed json object. 

6- Stringfy the new version of the json object after addition process and overwrite the new json
object into the data.json file.

7- log the new repository add into the console.

8- exits the function activation.
*/

const os = require('os'); 

const { Repository } = require("../models/repository");
const { FileOperator } = require('../utils/fileOperator');
const { JsonOperator } = require('../utils/jsonOperator');
const { Log } = require('../models/log');
const { 
  logger, 
  STATUS 
} = require('../utils/logger');
const { 
  getSuccessMessage, 
  TYPES 
} = require('../utils/messageHandler');

const currentOS = os.type();

const addRepository = (path) => {
  const condition = currentOS === `Linux` || currentOS === `Darwin`;
  const index = path.lastIndexOf(condition ? '/' :`\\`) + 1;
  const name = path.substring(index);
  
  const repository = new Repository(
    name, path, new Date(Date.now()).toUTCString()
  );

  const data = FileOperator.readFromFile(
    `${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json` 
  );

  const parsedData = JsonOperator.parsingJsonData(data);
  parsedData["repositories"].push(repository);

  FileOperator.writeToFile(
    `${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`,
    JSON.stringify(parsedData) 
  );

  logger(new Log(
    STATUS.SUCCESS,
    getSuccessMessage(TYPES.ADD, 'repository'),
    repository
  ));
}

module.exports = {
  addRepository
}