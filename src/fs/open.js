var toFlag = function(flags) {
  flags = flags & 3;
  if (flags === 0) return "r";
  if (flags === 1) return "w";
  return "r+";
};

let fd = 0;
const forStructure = structure => (path, flags, cb) => {
  // console.log("open(%s, %d)", path, flags);
  var flag = toFlag(flags); // convert flags to a node style string
  cb(0, fd++); // 42 is a file descriptor
};

module.exports = {
  forStructure
};
