const dotenv = require("dotenv");

const {FileOperator} = require('./utils/fileOperator');
const {JsonOperator} = require('./utils/jsonOperator');
const {Log } = require('./models/log')
const { STATUS, logger } = require("./utils/logger");
const { getSuccessMessage, TYPES } = require("./utils/messageHandler");
const { add } = require('./commands/add'); 


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

// const stringJson = JSON.stringify(data);
// FileOperator.writeToFile(`${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`, stringJson);
// const readData = FileOperator.readFromFile(`${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`);
// console.log(readData);
// const jsonObject = JsonOperator.parsingJsonData(readData);
// console.log(jsonObject);
// const data = FileOperators.readFromFile("./data.json");


// --> Test for write to file 
// const newData = [{ user1: { user: "hfdkjf", pass: "sfdkjf" } }];


// --> Test for read from file 

// const data = FileOperator.readFromFile(`${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`)
// logger(new Log(STATUS.SUCCESS, getSuccessMessage(TYPES.FILE_READ), JsonOperator.parsingJsonData(data)))

// const path = '/home/user/repo/project2';
// add();
// console.log(data.repositories);