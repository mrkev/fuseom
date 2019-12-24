const { withDir } = require("../pathup");
const fuse = require("fuse-bindings");

let fd = 1;
const forStructure = structure => (path, flags, cb) => {
  if (process.env.VERBOSE) console.log("opendir(%s, %d)", path, flags);

  let dir = null;
  try {
    dir = withDir(path, structure);
  } catch (e) {
    console.error(e);
    cb(-1, -1);
  }

  dir.emit("opendir");

  // Files get even file descriptors. Directories get odd ones.
  fd++;
  fd++;
  cb(0, fd);
};

module.exports = {
  forStructure
};
