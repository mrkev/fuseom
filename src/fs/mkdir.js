const { pathup, parse, withNode, withDir } = require("../pathup");
const fuse = require("fuse-native");
const Directory = require("../om/Directory");

const forStructure = (structure) => (path, mode, cb) => {
  if (process.env.VERBOSE) {
    console.log("mkdir(%s, %s)", path, mode);
  }

  // Build destination name, path.
  const destDirPath = parse(path);
  if (destDirPath.length < 1) {
    return cb(-1);
  }
  const name = destDirPath.pop();

  // Ensure destination directory
  let parent = null;
  try {
    parent = withDir(destDirPath, structure);
  } catch (e) {
    console.error("mkdir:", e.message);
    return cb(-1);
  }

  // Ensure not replacing an existing node
  if (parent.getChildNamed(name) != null) {
    return cb(-1);
  }

  // Create new dir
  const newDir = new Directory({ name, children: [], mode });
  parent.appendChild(newDir);
  parent.emit("mkdir");
  return cb(0);
};

module.exports = { forStructure };
