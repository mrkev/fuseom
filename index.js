const fuse = require("fuse-bindings");
const { simple } = require("./structure");
const getattr = require("./fs/getattr").forStructure(simple);
const open = require("./fs/open").forStructure(simple);
const read = require("./fs/read").forStructure(simple);
const readdir = require("./fs/readdir").forStructure(simple);

const mountPath = process.platform !== "win32" ? "./mnt" : "M:\\";

fuse.mount(mountPath, { getattr, open, read, readdir }, function(err) {
  if (err) throw err;
  console.log("filesystem mounted on " + mountPath);
});

process.on("SIGINT", function() {
  fuse.unmount(mountPath, function(err) {
    if (err) {
      console.log("filesystem at " + mountPath + " not unmounted", err);
    } else {
      console.log("filesystem at " + mountPath + " unmounted");
    }
  });
});

function exit() {
  fuse.unmount(mountPath, function(err) {
    if (err) {
      console.log("filesystem at " + mountPath + " not unmounted", err);
    } else {
      console.log("filesystem at " + mountPath + " unmounted");
    }
  });
  process.exit(0);
}
