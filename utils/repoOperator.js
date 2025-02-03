class RepoOperator {
  static getRepoIndexByName = (data, repoName) => {
    console.log("data from repo operator: ", data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === repoName) return i;
    }
    return -1;
    // const result = Array(data).findIndex((el) => el.name === repoName);
    // return result;
  };

  static removeRepoByIndex = (data, index) => {
    data.splice(index, 1);
  };
  static updataRepo = (data, repoIndex) => {
    data["repositories"][repoIndex]["lastOpen"] = new Date(
      Date.now()
    ).toUTCString();
  };
}

module.exports = { RepoOperator };
