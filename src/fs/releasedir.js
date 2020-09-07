const { withDir } = require("../pathup");
const fuse = require("fuse-bindings");

const forStructure = (structure) => (path, fd, cb) => {
  if (process.env.VERBOSE) console.log("releasedir(%s, %d)", path, fd);

  let dir = null;
  try {
    dir = withDir(path, structure);
  } catch (e) {
    console.error(e);
    cb(-1);
  }

  dir.emit("releasedir");

  cb(0);
};

module.exports = {
  forStructure,
};
