const { withFile } = require("../pathup");

/** Unlink: Remove a file */
const forStructure = (structure) => (path, cb) => {
  if (process.env.VERBOSE) console.log("unlink(%s, %d)", path);

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
  forStructure,
};
