const { mount } = require("../src/index");

const { simple2, startAdding, cleanup } = require("./example-structure");

if (require.main === module) {
  const mountPath = process.platform !== "win32" ? "./mnt2" : "M:\\";
  const mounted = mount(mountPath, simple2);
  startAdding();
  mounted.addListener("unmount", function onUnmount() {
    cleanup();
  });
}
