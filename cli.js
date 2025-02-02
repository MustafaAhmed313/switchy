const dotenv = require("dotenv");

const { init } = require("./commands/init");


const {
  add,
  remove,
  list,
  update
} = require('./commands/index');

dotenv.config({ path: ".env" });

add('D:\\GitRepos\\switchy');
list()


