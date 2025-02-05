#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const { Action } = require("./action");

program
  .command("init")
  .description(
    "Initialize the data file where the repository and its data are stored (no arguments)."
  )
  .action(() => {
    Action.init();
  });
program
  .command("add <repoPath>")
  .description("Add a new repository (arguments: `repoPath`).")
  .action((repoPath) => {
    Action.addAction(repoPath);
  });
program
  .command("list")
  .description("List all repositories (no arguments).")
  .action(() => {
    Action.listAction();
  });
program
  .command("remove <repoName>")
  .description(
    "Remove a specific repository by its name (argument: `repoName`)"
  )
  .action((repoName) => {
    Action.removeAction(repoName);
  });
// ********************
// // first thing if data file is not exist make data file
// RunScript.initializeData();
// // check if data file is empty, if yes then initialize it
// const path = getDataPath();
// if (fileIsEmpty(path) === "Empty") {
//   logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.EMPTY, "data")));
//   init();
// }
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

// The line is important for parse args
program.parse(process.argv);
