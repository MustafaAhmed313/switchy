const dotenv = require("dotenv");

const {
  add,
  init,
  list,
  remove,
  update
} = require('./commands/index')
dotenv.config({ path: ".env" });

init();

// add('D:\\GitRepos\\switchy');
// list()


