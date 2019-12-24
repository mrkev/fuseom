const Node = require("./Node.js");
const Mode = require("stat-mode");

class File extends Node {
  get _type() {
    return "__file";
  }

  constructor(options = {}) {
    super();

    this.name = options.name || "untitled";
    if (!options.name) {
      console.warn(
        "A file wasn't given a name. Going with default 'undefined'."
      );
    }

    this.mtime = options.mtime || new Date();
    this.atime = options.atime || new Date();
    this.ctime = options.ctime || new Date();
    // this.birthtime = options.birthtime || new Date();

    this.nlink = options.nlink || 1;

    this.mode = new Mode(options.mode != null ? options.mode : 0);
    this.mode.isFile(true);
    this.mode.owner.read = true;
    this.mode.group.read = true;
    this.mode.others.read = true;

    this.contents = options.contents || "";
  }

  getAttr() {
    return {
      mtime: this.mtime,
      atime: this.atime,
      ctime: this.ctime,
      nlink: this.nlink,
      size: this.contents.length,
      mode: this.mode.valueOf(),
      uid: process.getuid ? process.getuid() : 0,
      gid: process.getgid ? process.getgid() : 0
    };
  }
}

module.exports = File;
