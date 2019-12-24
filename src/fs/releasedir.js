const { pathup } = require("../pathup");
const fuse = require("fuse-bindings");

const forStructure = structure => (path, fd, cb) => {
  if (process.env.VERBOSE) console.log("releasedir(%s, %d)", path, fd);
  cb(0);
};

module.exports = {
  forStructure
};
