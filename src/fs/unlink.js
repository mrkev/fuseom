const { withFile } = require("../pathup");
const fuse = require("fuse-bindings");

let fd = 1;
const forStructure = structure => (path, cb) => {
  if (process.env.VERBOSE) console.log("unlink(%s, %d)", path, flags);

  let file = null;
  try {
    file = withFile(path, structure);
  } catch (e) {
    console.error(e);
    cb(-1);
  }

  file.emit("unlink");

  cb(0);
};

module.exports = {
  forStructure
};
