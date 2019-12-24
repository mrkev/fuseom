const fuse = require("fuse-bindings");
var events = require("events");

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

    const mounted = new events.EventEmitter();

    fuse.mount(
      mountPath,
      {
        getattr,
        open,
        read,
        readdir,
        opendir,
        releasedir,
        unlink,
        rename
      },
      function(err) {
        if (err) throw err;
        console.log("filesystem mounted on " + mountPath);
      }
    );

    function attemptUnmount() {
      fuse.unmount(mountPath, function(err) {
        if (err) {
          console.log("filesystem at " + mountPath + " not unmounted", err);
        } else {
          console.log("filesystem at " + mountPath + " unmounted");
          mounted.emit("unmount");
        }
      });
    }

    process.on("SIGINT", attemptUnmount);
    process.on("uncaughtException", attemptUnmount);

    return mounted;
  }
};
