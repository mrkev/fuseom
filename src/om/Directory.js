const Node = require("./Node.js");
const Mode = require("stat-mode");

class Directory extends Node {
  get _type() {
    return "__dir";
  }

  constructor(options = {}) {
    super();
    this.name = options.name || "untitled";
    if (!options.name) {
      console.warn(
        "A directory wasn't given a name. Going with default 'undefined'."
      );
    }

    this.children = {};

    this.mtime = options.mtime || new Date();
    this.atime = options.atime || new Date();
    this.ctime = options.ctime || new Date();
    this.nlink = options.nlink || 1;

    this.mode = new Mode(options.mode != null ? options.mode : 0);
    this.mode.isDirectory(true);
    if (options.mode == null) {
      this.mode.owner.read = true;
      this.mode.group.read = true;
      this.mode.others.read = true;
      this.mode.owner.write = true;
      this.mode.group.write = true;
      this.mode.others.write = true;
      this.mode.owner.execute = true;
      this.mode.group.execute = true;
      this.mode.others.execute = true;
    }

    (options.children || []).forEach(node => {
      this.appendChild(node);
    });
  }

  getAttr() {
    return {
      mtime: this.mtime,
      atime: this.atime,
      ctime: this.ctime,
      nlink: this.nlink,
      size: 100, //todo
      mode: this.mode.valueOf(),
      uid: process.getuid ? process.getuid() : 0,
      gid: process.getgid ? process.getgid() : 0
    };
  }

  appendChild(node) {
    if (!(node instanceof Node)) {
      console.error("Can't append non-node to directory.");
      return;
    }

    if (this.children[node.name]) {
      console.warn(
        `Duplicate definition of node with name '${node.name}'. The latter will override the former.`
      );
    }

    this.children[node.name] = node;
  }
}

module.exports = Directory;
