const fetch = require("node-fetch");
const Directory = require("../src/om/Directory.js");
const File = require("../src/om/File.js");
const { mount } = require("../src/index.js");
const mountPath = process.platform !== "win32" ? "./mnt2" : "M:\\";

const tifu = new Directory({
  name: "root",
  children: []
});

if (require.main === module) {
  fetch("https://www.reddit.com/r/tifu.json", { method: "GET" })
    .then(res => res.json())
    .then(json => {
      for (post of json.data.children) {
        const contents = post.data.selftext;
        const name = post.data.title;
        tifu.appendChild(new File({ name, contents }));
      }
    })
    .then(() => {
      const mounted = mount(mountPath, tifu);
    })
    .catch(console.error);
}
