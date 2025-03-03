const { init } = require('./init');
const { TAGS } = require('../utils/index');

const reset = () => {
  init();
  return TAGS.CLEARED;
};

module.exports = {
  reset
}