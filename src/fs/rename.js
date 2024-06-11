const { pathup, parse, withNode, withDir } = require("../pathup");

const forStructure = (structure) => (src, dest, cb) => {
  if (process.env.VERBOSE) {
    console.log("rename(%s, %s)", src, dest);
  }

  // Ensure target exists
  let node = null;
  try {
    node = withNode(src, structure);
  } catch (e) {
    console.error("rename:", e.message);
    return cb(-1);
  }

  // Build destination name, path.
  const destPath = parse(dest);
  if (destPath.length < 1) {
    return cb(-1);
  }
  const newName = destPath.pop();

  // Get current parent, new parent
  const parent = node.parent;
  let newParent = null;
  try {
    newParent = withDir(destPath, structure);
  } catch (e) {
    console.error("rename, newParent:", e.message);
    return cb(-1);
  }

  // Ensure not replacing an existing node
  if (newParent.getChildNamed(newName) != null) {
    return cb(-1);
  }

  // Move the node
  parent.removeChild(node);
  node.name = newName;
  newParent.appendChild(node);
  node.emit("rename");
  return cb(0);
};

module.exports = { forStructure };
