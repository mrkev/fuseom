const Fuse = require("fuse-native");
const events = require("events");

module.exports = {
  mount(mountPath, structure) {
    const getattr = require("./fs/getattr").forStructure(structure);
    const open = require("./fs/open").forStructure(structure);
    const read = require("./fs/read").forStructure(structure);
    const readdir = require("./fs/readdir").forStructure(structure);
    const opendir = require("./fs/opendir").forStructure(structure);
    const releasedir = require("./fs/releasedir").forStructure(structure);
    const unlink = require("./fs/unlink").forStructure(structure);
    const rename = require("./fs/rename").forStructure(structure);
    const mkdir = require("./fs/mkdir").forStructure(structure);
    const rmdir = require("./fs/rmdir").forStructure(structure);

    const mounted = new events.EventEmitter();

    const fuse = new Fuse(
      mountPath,
      {
        // init,
        // access,
        // statfs,
        getattr,
        // fgetattr,
        // flush,
        // fsync,
        // fsyncdir,
        readdir,
        // truncate,
        // ftruncate,
        // readlink,
        // readlink,
        // chown,
        // chmod,
        // mknod,
        // setxattr,
        // getxattr,
        // listxattr,
        // removexattr,
        open,
        opendir,
        read,
        // write,
        // release,
        releasedir,
        // create,
        // utimens,
        unlink,
        rename,
        // link,
        // symlink,
        mkdir,
        rmdir,
        // destroy,
      },
      { debug: true }
    );

    fuse.mount(function (err) {
      if (err) throw err;
      console.log("filesystem mounted on " + mountPath);
    });

    function attemptUnmount() {
      fuse.unmount(mountPath, function (err) {
        if (err) {
          console.log(
            "filesystem at " + mountPath + " not unmounted",
            err.message
          );
        } else {
          console.log("filesystem at " + mountPath + " unmounted");
          mounted.emit("unmount");
        }
      });
    }

    process.on("SIGINT", attemptUnmount);
    process.on("uncaughtException", attemptUnmount);

    return mounted;
  },
};
