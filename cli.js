const dotenv = require("dotenv");
const { fileIsEmpty } = require("./utils/validator");
const { getDataPath } = require("./utils/pathModule");

const { logger, STATUS } = require("./utils/logger");
const {
  TYPES,
  getSuccessMessage,
  getErrorMessage,
} = require("./utils/messageHandler");
const { Log } = require("./models/log");
const {
  add,
  init,
  list,
  remove,
  update,
  redirect,
  search,
  lastOpenRepo,
} = require("./commands/index");
const { RunScript } = require("./utils/runScript");
dotenv.config({ path: ".env" });
// ********************
// // first thing if data file is not exist make data file
// RunScript.initializeData();
// // check if data file is empty, if yes then initialize it
const path = getDataPath();
if (fileIsEmpty(path) === "Empty") {
  logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.EMPTY, "data")));
  init();
}

// add("D:/GitRepos/discord");

// add("D:/GitRepos/facebook");
// add("D:/GitRepos/online-shopping");
// add("D:/GitRepos/order-notification-management");
// console.log("from cli : ", redirect("discord"));
// // list()

// console.log(search("facebook"));
console.log(lastOpenRepo());
