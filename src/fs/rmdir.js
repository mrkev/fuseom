const { withDir } = require("../pathup");
const fuse = require("fuse-bindings");

const forStructure = (structure) => (path, cb) => {
  if (process.env.VERBOSE) console.log("rmdir(%s, %d)", path);

  let dir = null;
  try {
    dir = withDir(path, structure);
  } catch (e) {
    console.error(e);
    cb(-1);
  }

  cb(0);
};

module.exports = {
  forStructure,
};
