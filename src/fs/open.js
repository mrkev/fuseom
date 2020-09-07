var toFlag = function (flags) {
  flags = flags & 3;
  if (flags === 0) return "r";
  if (flags === 1) return "w";
  return "r+";
};

let fd = 0;
const forStructure = (structure) => (path, flags, cb) => {
  if (process.env.VERBOSE) console.log("open(%s, %d)", path, flags);
  const flag = toFlag(flags); // convert flags to a node style string
  // Files get even file descriptors. Directories get odd ones.
  fd++;
  fd++;
  cb(0, fd);
};

module.exports = {
  forStructure,
};
