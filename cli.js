const dotenv = require("dotenv");

const {FileOperator} = require('./utils/fileOperator');
const {JsonOperator} = require('./utils/jsonOperator');
const {Log } = require('./models/log')
const { STATUS, logger } = require("./utils/logger");
const { getSuccessMessage, TYPES } = require("./utils/MessageHandler");


dotenv.config({ path: '.env' });

// const data = {
//     lastOpen: 'last opened repo using switchy!',
//     repositories: [
//         {
//             name: 'repository-name',
//             path: 'repository-path',
//             lastOpen: new Date(Date.now()).toUTCString()
//         }
//     ]
// }

// const data = FileOperators.readFromFile("./data.json");


// --> Test for write to file 
// const newData = [{ user1: { user: "hfdkjf", pass: "sfdkjf" } }];
const newData = [{ 
    user1: { 
      user: "hfdkjf", 
      pass: "sfdkjf", 
      method: function() { return "This is a function"; } // Functions cannot be stringified
    } 
  }];
  
FileOperator.writeToFile(
    "./data/data.json",
    JsonOperator.stringDataToWriteinJson(newData)
);

// --> Test for read from file 

// const data = FileOperator.readFromFile(`${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`)
// logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.FILE_READ), JsonOperator.parsingJsonData(data)))


