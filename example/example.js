const { mount } = require("../src/index.js");

const { simple2 } = require("./structure");

if (require.main === module) {
  const mountPath = process.platform !== "win32" ? "./mnt" : "M:\\";
  mount(mountPath, simple2);
}
