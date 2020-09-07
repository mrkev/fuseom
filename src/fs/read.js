const { withFile } = require("../pathup");
const fuse = require("fuse-native");

const forStructure = (structure) => (path, fd, buf, len, pos, cb) => {
  if (process.env.VERBOSE) {
    console.log("read(%s, %d, %d, %d)", path, fd, len, pos);
  }
  let file = null;
  try {
    file = withFile(path, structure);
  } catch (e) {
    console.error(e);
    return cb(fuse.ENOENT);
  }

  if (typeof file.contents === "string") {
    const str = file.contents.slice(pos, pos + len);
    if (!str) return cb(0);
    buf.write(str);
    return cb(str.length);
  } else if (Buffer.isBuffer(file.contents)) {
    const numbytes = file.contents.copy(buf, 0, pos, pos + len);
    return cb(numbytes);
  } else {
    cb(-1);
  }
};

module.exports = {
  forStructure,
};
