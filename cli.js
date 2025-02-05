const {
  fileIsEmpty,
  getDataPath,
  logger,
  STATUS,
  TYPES,
  getErrorMessage,
  RunScript
} = require('./utils/index');

const { Log } = require("./models/log");

const {
  add,
  init,
  list,
  remove,
  update,
  redirect,
  search,
  last,
  reset
} = require("./commands/index");

// ********************
// // first thing if data file is not exist make data file
// RunScript.initializeData();
// // check if data file is empty, if yes then initialize it
const path = getDataPath();
if (fileIsEmpty(path) === "Empty") {
  logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.EMPTY, "data")));
  init();
}

// add('D:\\GitRepos\\switchy');

// add("D:/GitRepos/discord");

// add("D:/GitRepos/facebook");
// add("D:/GitRepos/online-shopping");
// add("D:/GitRepos/order-notification-management");
// console.log("from cli : ", redirect("discord"));
// // list()

// console.log(search("facebook"));
// console.log(last());

// list();
// redirect('switchy');

// reset();
