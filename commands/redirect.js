const {
  FileOperator,
  JsonOperator,
  RepoOperator,
  RunScript,
  getDataPath
} = require('../utils/index')
/**
 * The `redirect` function handles the process of:
 * 1. Checking if a repository exists in the data file.
 * 2. Updating the repository's "lastOpen" field to mark it as the most recently opened repo.
 * 3. Running a script to open the repository in VSCode.
 * 4. Writing the updated data back to the JSON file.
 *
 * @param {string} name - The name of the repository to be processed.
 * @returns {string} - Returns "Exist" if the repository exists and the operation was successful, otherwise returns "NotExist".
 */

const redirect = (name) => {
  // Construct the file path to the JSON data file where repositories are stored.
  const path = getDataPath();

  // Step 1: Read the data from the JSON file.
  let data = FileOperator.readFromFile(path);

  // Step 2: Parse the JSON data to make it manipulable.
  data = JsonOperator.parsingJsonData(data);

  // Default message to return, assuming the repo exists.
  let message = "Exist";

  // Step 3: Check if the repository exists in the data file.
  const repoIndex = RepoOperator.getRepoIndexByName(
    data["repositories"],
    name
  );

  // If repoIndex is -1, it means the repository doesn't exist, return "NotExist".
  if (repoIndex === -1) return "NotExist";

  // Step 4: Update the "lastOpen" field to the name of the current repository.
  RepoOperator.updataRepo(data, repoIndex);
  data["lastOpen"] = name;

  // Step 5: Run the script to open the repository in VSCode using `RunScript.openInVSCode`.
  // RunScript.openInVSCode("../Zoombie-CLI");
  RunScript.openInVSCode(data["repositories"][repoIndex]["path"]);

  // Step 6: Convert the updated data back to a string format for writing to the file.
  data = JsonOperator.stringDataToWriteinJson(data);

  // Step 7: Write the updated data back to the JSON file.
  FileOperator.writeToFile(path, data);

  // Return the message indicating that the repository was found and processed.
  return message;
};

module.exports = {
  redirect,
};
