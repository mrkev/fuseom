// Parses a path
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

// Returns the object representing a path in the structure
// [string | Array] -> obj
function pathup(path, arch) {
  if (arch._type !== "__dir") {
    throw new Error("ROOT is not a __dir");
  }

  const arrpath = Array.isArray(path) ? path : parse(path);

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

// Returns a directory or null if none was found
// [string | Array] -> Directory + throws
function withDir(path, structure) {
  let obj = pathup(path, structure);

  if (obj === null) {
    throw new Error("No node found.");
  } else if (obj._type === "__dir") {
    return obj;
  } else if (obj._type === "__file") {
    throw new Error("Node is a file, not a directory.");
  } else {
    throw new Error("Node is of unknown type");
  }
}

// Returns a directory or null if none was found
// [string | Array] -> File + throws
function withFile(path, structure) {
  let obj = pathup(path, structure);

  if (obj === null) {
    throw new Error("No node found.");
  } else if (obj._type === "__dir") {
    throw new Error("Node is a directory, not a file.");
  } else if (obj._type === "__file") {
    return obj;
  } else {
    throw new Error("Node is of unknown type");
  }
}

// Returns any node if one was found
// [string | Array] -> Node + throws
function withNode(path, structure) {
  let obj = pathup(path, structure);

  if (obj === null) {
    throw new Error("No node found.");
  } else if (obj._type === "__dir") {
    return obj;
  } else if (obj._type === "__file") {
    return obj;
  } else {
    throw new Error("Node is of unknown type");
  }
}

module.exports = {
  parse,
  pathup,
  withFile,
  withDir,
  withNode
};
