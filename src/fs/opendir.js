const { pathup } = require("../pathup");
const fuse = require("fuse-bindings");

let fd = 1;
const forStructure = structure => (path, flags, cb) => {
  if (process.env.VERBOSE) console.log("opendir(%s, %d)", path, flags);
  // Files get even file descriptors. Directories get odd ones.
  fd++;
  fd++;
  cb(0, fd);
};

module.exports = {
  forStructure
};
