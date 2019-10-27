const { pathup } = require("../pathup");
const fuse = require("fuse-bindings");

const forStructure = structure => (path, cb) => {
  // console.log("getattr(%s)", path);
  let obj = null;
  try {
    obj = pathup(path, structure);
  } catch (e) {
    console.error(e);
  }

  if (obj === null) {
    cb(fuse.ENOENT);
    return;
  } else if (obj.type === "__dir") {
    cb(0, {
      mtime: new Date(),
      atime: new Date(),
      ctime: new Date(),
      nlink: 1,
      size: 100,
      // TODO: what does mode mean
      mode: 16877,
      uid: process.getuid ? process.getuid() : 0,
      gid: process.getgid ? process.getgid() : 0
    });
    return;
  } else if (obj.type === "__file") {
    cb(0, {
      mtime: new Date(),
      atime: new Date(),
      ctime: new Date(),
      nlink: 1,
      // TODO: size
      size: 12,
      mode: 33188,
      uid: process.getuid ? process.getuid() : 0,
      gid: process.getgid ? process.getgid() : 0
    });
    return;
  } else {
    console.log("INVALID OBJECT OF TYPE", obj.type);
    cb(fuse.ENOENT);
    return;
  }
};

module.exports = { forStructure };
