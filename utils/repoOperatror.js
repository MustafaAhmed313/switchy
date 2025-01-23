class RepoOperator {
  static getRepoIndexByName = (data, repoName) => {
    const result = data.findIndex((el) => el.name === repoName);
    return result;
  };

  static removeRepoByIndex = (data, index) => {
    data.splice(index, 1);
  };
}

module.exports = { RepoOperator };
