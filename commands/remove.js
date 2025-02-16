// 1) Node Modules

// 2) User Defined Modules


const {
  FileOperator,
  JsonOperator,
  getDataPath,
  RepoOperator,
  TAGS,
} = require("../utils/index");

const remove = (name) => {
  //  first thing ==> read data from file data
  const filePath = getDataPath();
  
  let data = FileOperator.readFromFile(filePath);
  // second step parse it
  data = JsonOperator.parsingJsonData(data);
  
  if (data["lastOpen"] === data["repositories"].name) {
    data["lastOpen"] = "none";
  }
  // third step delete repo
  let index = RepoOperator.getRepoIndexByName(data["repositories"], name);
    
    // four strigify it
  if (index === -1) {
    return TAGS.DOES_NOT_EXIST;
  } 

  RepoOperator.removeRepoByIndex(data["repositories"], index);
  data = JsonOperator.stringDataToWriteinJson(data);
  FileOperator.writeToFile(filePath, data);
  return TAGS.REMOVED;
};

module.exports = {
  remove,
};
