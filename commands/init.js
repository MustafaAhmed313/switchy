const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const { pathIsExist } = require("../utils/validator");

const config = require("../config/config");
const init = () => {
  //   console.log("hello from init function");
  const filePath = `${config.DIRECTORY_DATA}/${config.REPOSITORY_NAME}.json`;
  // check if it is exist or no before make the below steps
  //   ..
  // define the structure for data file
  const isExist = pathIsExist(filePath);
  //   make file if it is not exist before with this below structure
  if (!isExist) {
    let dataStructure = {
      lastOpen: "none",
      repositories: [],
    };
    //   then write it into date file that is in data directory
    dataStructure = JsonOperator.stringDataToWriteinJson(dataStructure);
    FileOperator.writeToFile(filePath, dataStructure);
  }
};

module.exports = {
  init
};