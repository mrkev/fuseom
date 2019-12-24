const { pathup } = require("../pathup");
const fuse = require("fuse-bindings");

const forStructure = structure => (path, fd, buf, len, pos, cb) => {
  let obj = null;
  try {
    obj = pathup(path, structure);
  } catch (e) {
    console.error(e);
  }

  if (obj === null) {
    cb(fuse.ENOENT);
    return;
  } else if (obj._type === "__dir") {
    cb(-1);
    return;
  } else if (obj._type === "__file") {
    if (process.env.VERBOSE) {
      console.log("read(%s, %d, %d, %d)", path, fd, len, pos);
    }
    var str = obj.contents.slice(pos, pos + len);
    if (!str) return cb(0);
    buf.write(str);
    return cb(str.length);
  } else {
    console.log("INVALID OBJECT OF TYPE", obj._type);
    cb(fuse.ENOENT);
    return;
  }
};

module.exports = {
  forStructure
};
