const { pathup } = require("../pathup");
const fuse = require("fuse-native");

const forStructure = (structure) => (path, cb) => {
  if (process.env.VERBOSE) console.log("readdir(%s)", path);
  let obj = null;
  try {
    obj = pathup(path, structure);
  } catch (e) {
    console.error(e);
  }

  if (obj === null) {
    cb(fuse.ENOENT);
    return;
  }

  if (obj === null || obj._type !== "__dir") {
    cb(0);
  } else {
    cb(0, Object.keys(obj.children));
  }
};

module.exports = { forStructure };
