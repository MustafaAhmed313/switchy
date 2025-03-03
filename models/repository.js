class Repository {
  constructor(name, path, lastOpen) { 
    this.name = name;
    this.path = path;
    this.lastOpen = lastOpen
  }
}

module.exports = {
  Repository
};