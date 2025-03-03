const { FileOperator } = require("./fileOperator");
const { JsonOperator } = require("./jsonOperator");
const { RepoOperator } = require("./repoOperator");
const { RunScript } = require("./runScript");
const { TAGS } = require('./tags')

const { 
  logger, 
  STATUS 
} = require("./logger");

const {
  TYPES,
  getErrorMessage,
  getSuccessMessage,
} = require("./messageHandler");

const { 
  getDataPath, 
  getPath, 
  getName 
} = require("./pathModule");

const { 
  fileIsEmpty, 
  pathIsExist 
} = require("./validator");

const utils = {
  FileOperator,
  JsonOperator,
  RepoOperator,
  logger,
  STATUS,
  TYPES,
  getDataPath,
  getPath,
  getErrorMessage,
  getSuccessMessage,
  fileIsEmpty,
  pathIsExist,
  getName,
  RunScript,
  TAGS
};

module.exports = utils;
