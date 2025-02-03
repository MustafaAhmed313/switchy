const { add } = require('./add');
const { update } = require('./update');
const { remove } = require('./remove')
const { list } = require('./list')
const { init } = require('./init')

const commands = {
  add, 
  update, 
  remove, 
  list, 
  init
};

module.exports = commands;