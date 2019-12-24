const { mount } = require("../src/index.js");

const { simple2, startAdding, stopAdding } = require("./example-structure");

if (require.main === module) {
  const mountPath = process.platform !== "win32" ? "./mnt3" : "M:\\";
  const mounted = mount(mountPath, simple2);
  startAdding();
  mounted.addListener("unmount", function onUnmount() {
    stopAdding();
  });
}
