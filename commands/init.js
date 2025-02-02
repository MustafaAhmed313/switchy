const { FileOperator } = require("../utils/fileOperator");
const { JsonOperator } = require("../utils/jsonOperator");
const { pathIsExist } = require("../utils/validator");

exports.init = () => {
  //   console.log("hello from init function");
  const filePath = `${process.env.DIRECTORY_DATA}/${process.env.REPOSITORY_NAME}.json`;
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
