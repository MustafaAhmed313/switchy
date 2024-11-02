const os = require('os');

const currentOS = os.platform()
class Repository {
  constructor(path) {
    const stringPath = String(path); 
    this.name = stringPath.substring(
      stringPath.lastIndexOf(currentOS === 'linux' ? '/' : '\\') + 1
    );
    this.path = stringPath;
    this.lastOpen = new Date(Date.now()).toUTCString()
  }
}

module.exports = {
  Repository
};