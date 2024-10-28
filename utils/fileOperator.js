const fs = require('fs');
const path = require('path');

const {
  ERRORS,
  getErrorMessage
} = require('../utils/errorMessageHandler');

class FileOperator {

  static async readJsonFile() {
    try {
      const data = await new Promise((resolve, reject) => {
        fs.readFile(
          path.join(process.env.DIRECTORY_DATA, `${process.env.REPOSITORY_NAME}.json`),
          'utf-8',
          (err, data) => {
            if (err) {
              return reject(getErrorMessage(ERRORS.FILE_READ));
            }
            try {
              const jsonObj = JSON.parse(data);
              resolve(jsonObj);
            } catch (parseError) {
              reject(getErrorMessage(ERRORS.JSON_PARSE));
            }
          }
        );
      });

      return data;
    } catch (error) {
      console.error('Error reading JSON file:', error);
      throw error;
    }
  }

  static async writeJsonFile(data) {
    try {
      await new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(process.env.DIRECTORY_DATA, `${process.env.REPOSITORY_NAME}.json`),
          JSON.stringify(data), // Ensure data is a JSON string
          (err) => {
            if (err) {
              return reject(getErrorMessage(ERRORS.FILE_WRITE));
            }
            resolve(true);
          }
        );
      });

      console.log('File written successfully');
    } catch (error) {
      console.error('Error writing JSON file:', error);
      throw error;
    }
  }
}

const print = () =>
  console.log("env variable: ", process.env.DIRECTORY_DATA);

module.exports = {
  print,
  FileOperator
};
