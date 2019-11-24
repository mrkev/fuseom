// string -> array of entries to follow
function parse(path) {
  const arrpath = path.split("/").reduce((acc, x) => {
    if (x === "") return acc;
    if (x === ".") return acc;
    if (x === "..") {
      // error if empty
      acc.pop();
      return acc;
    }
    return acc.concat([x]);
  }, []);

  return arrpath;
}

// string -> obj
function pathup(path, arch) {
  if (arch._type !== "__dir") {
    throw new Error("ROOT is not a __dir");
  }

  const arrpath = parse(path);

  const result = arrpath.reduce((acc, x) => {
    // x is a string
    if (!acc.children) {
      // error, trying to get children from file
      throw new Error("current node is not a directory");
    }

    const child = acc.children[x];

    if (child == undefined) {
      throw new Error(`${x} in ${arrpath.join("/")} is not a node`);
    }

    return child;
  }, arch);

  return result;
}

module.exports = {
  parse,
  pathup
};
