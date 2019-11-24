const fuse = require("fuse-bindings");

module.exports = {
  mount(mountPath, structure) {
    const getattr = require("./fs/getattr").forStructure(structure);
    const open = require("./fs/open").forStructure(structure);
    const read = require("./fs/read").forStructure(structure);
    const readdir = require("./fs/readdir").forStructure(structure);

    fuse.mount(mountPath, { getattr, open, read, readdir }, function(err) {
      if (err) throw err;
      console.log("filesystem mounted on " + mountPath);
    });

    process.on("SIGINT", function exit() {
      fuse.unmount(mountPath, function(err) {
        if (err) {
          console.log("filesystem at " + mountPath + " not unmounted", err);
        } else {
          console.log("filesystem at " + mountPath + " unmounted");
        }
      });
    });
  }
};
