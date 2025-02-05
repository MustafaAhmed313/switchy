const {
  FileOperator,
  JsonOperator,
  getDataPath
} = require('../utils/index') 

/**
 * Initializes the data file by checking if the specified path exists.
 * If the file doesn't exist, a default data structure is created and written to the file.
 * The data structure contains:
 * - `lastOpen`: a string indicating the last opened state, initialized to "none".
 * - `repositories`: an array to hold repositories, initialized as an empty array.
 *
 * The function uses the following utilities:
 * - `getDataPath()` from `pathModule`: retrieves the file path where the data will be saved.
 * - `pathIsExist()`: checks whether the file already exists at the specified path (though unused here, can be added if needed).
 * - `JsonOperator.stringDataToWriteinJson()`: converts the data structure into a JSON string format.
 * - `FileOperator.writeToFile()`: writes the JSON string data to the file.
 *
 * Logs the steps taken during the initialization process, including the file path and any relevant actions.
 *
 * @returns {void} Nothing is returned.
 */

const init = () => {
  // Get the file path for where the data file should be saved
  const path = getDataPath();

  // Define the default data structure to be written to the file
  let dataStructure = {
    lastOpen: "none", // Default value for 'lastOpen' indicating no repository has been opened yet
    repositories: [], // Initial empty array for repositories
  };

  // Convert the JavaScript object data structure into a JSON string
  dataStructure = JsonOperator.stringDataToWriteinJson(dataStructure);

  // Write the stringified data structure to the file at the given path
  FileOperator.writeToFile(path, dataStructure);
};

// Export the init function so it can be used in other parts of the application
module.exports = {
  init,
};
