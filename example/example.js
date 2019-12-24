const { mount } = require("../src/index.js");

const { simple2, startAdding, stopAdding } = require("./structure");

if (require.main === module) {
  const mountPath = process.platform !== "win32" ? "./mnt2" : "M:\\";
  const mounted = mount(mountPath, simple2);
  startAdding();
  mounted.addListener("unmount", function onUnmount() {
    stopAdding();
  });
}
