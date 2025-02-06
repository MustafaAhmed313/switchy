#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const { Action } = require("./action");

// ********************
Action.handleEnvAction();
// ********************
program
  .command("init")
  .description(
    "Initialize the data file where the repository and its data are stored (no arguments)."
  )
  .action(() => {
    Action.initAction();
  });
program
  .command("add <repoPath>")
  .description("Add a new repository (arguments: `repoPath`).")
  .action((repoPath) => {
    Action.addAction(repoPath);
  });
program
  .command("last")
  .description("Display the last open repository (no arguments)")
  .action(() => {
    Action.lastAction();
  });
program
  .command("list")
  .description("List all repositories (no arguments).")
  .action(() => {
    Action.listAction();
  });
program
  .command("redirect <repoName>")
  .description("Open specfic repo with his name (arguments: `repoName`")
  .action(() => {
    Action.redirectAction(repoName);
  });
program
  .command("search <repoName>")
  .description(
    "Search for a repository to get its information by name (argument: `repoName`)"
  )
  .action((repoName) => {
    Action.searchAction(repoName);
  });
program
  .command("remove <repoName>")
  .description(
    "Remove a specific repository by its name (arguments: `repoName`)"
  )
  .action((repoName) => {
    Action.removeAction(repoName);
  });
program
  .command("update <repoName> <newPath>")
  .description(
    "Update the path of an existing repository (arguments: `repoName`, `newPath`)"
  )
  .action((repoName, newPath) => {
    Action.updateAction(repoName, newPath);
  });
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
