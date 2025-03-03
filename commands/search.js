const {
  FileOperator,
  JsonOperator,
  getDataPath,
  RepoOperator,
  TAGS
} = require('../utils/index')

/**
 * Searches for a repository by name in the data file.
 *
 * This function:
 * - Retrieves the path of the data file using `getDataPath()`.
 * - Reads the data file using `FileOperator.readFromFile()`.
 * - Parses the JSON data using `JsonOperator.parsingJsonData()`.
 * - Searches for the repository index using `RepoOperator.getRepoIndexByName()`.
 *
 * @param {string} name - The name of the repository to search for.
 * @returns {Object|string} - Returns the repository object if found, otherwise returns `"NotExist"`.
 */

const search = (name) => {
  // Get the path to the data file
  const path = getDataPath();

  // Read the data file content
  let data = FileOperator.readFromFile(path);

  // Parse the file content into a JSON object
  data = JsonOperator.parsingJsonData(data);

  // Find the index of the repository with the given name
  const index = RepoOperator.getRepoIndexByName(data["repositories"], name);

  // If the repository is not found, return "NotExist"
  if (index === -1) {
    return TAGS.DOES_NOT_EXIST;
  }

  // Return the found repository object
  return data["repositories"][index];
};

// Export the search function for use in other modules
module.exports = {
  search,
};
