const dotenv = require("dotenv");

const {
  add,
  remove,
  list,
  update
} = require('./commands/index');

dotenv.config({ path: ".env" });

add('D:\\GitRepos\\switchy');
list()

