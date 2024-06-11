import FSNode from "./FSNode";
import { Mode } from "stat-mode";

type Options = {
  mtime?: Date;
  atime?: Date;
  ctime?: Date;
  name?: string;
  mode?: number;
  contents?: string;
  nlink?: any; // todo
};

class FSFile extends FSNode {
  get _type() {
    return "__file";
  }

  constructor(optionsArg: Options) {
    const options = optionsArg ?? ({} as Options);
    const name = options.name || "untitled";
    super(name);

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
    if (options.mode == null) {
      this.mode.owner.read = true;
      this.mode.owner.write = false;
      this.mode.owner.execute = false;

      this.mode.group.read = true;
      this.mode.group.write = false;
      this.mode.group.execute = false;

      this.mode.others.read = true;
      this.mode.others.write = false;
      this.mode.others.execute = false;
    }

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
      gid: process.getgid ? process.getgid() : 0,
    };
  }
}

module.exports = FSFile;
