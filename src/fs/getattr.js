const { pathup } = require("../pathup");
const Fuse = require("fuse-native");

const forStructure = (structure) => (path, cb) => {
  if (process.env.VERBOSE) {
    console.log("getattr(%s)", path);
  }
  let obj = null;
  try {
    obj = pathup(path, structure);
  } catch (e) {
    if (process.env.VERBOSE) {
      console.error("getattr:", e.message);
    }
  }

  if (obj === null) {
    cb(Fuse.ENOENT);
    return;
  } else if (obj._type === "__dir") {
    cb(0, obj.getAttr());
    return;
  } else if (obj._type === "__file") {
    const attr = obj.getAttr();
    cb(0, attr);
    return;
  } else {
    console.log("INVALID OBJECT OF TYPE", obj._type);
    cb(Fuse.ENOENT);
    return;
  }
};

module.exports = { forStructure };
