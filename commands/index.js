const { add } = require("./add");
const { update } = require("./update");
const { remove } = require("./remove");
const { list } = require("./list");
const { init } = require("./init");
const { redirect } = require("./redirect");
const { search } = require("./search");
const commands = {
  add,
  update,
  remove,
  list,
  init,
  redirect,
  search,
};

module.exports = commands;
