const Node = require("./Node.js");

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
      size: 100,
      // TODO: what does mode mean
      mode: 16877,
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
